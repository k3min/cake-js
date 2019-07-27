import Context from '../../GL';
import { CompareFunction, CullingMode, StencilFunction } from '../../GL/Helpers';
import { TextReader } from '../../Core/Helpers';
import { Path, Resource, ResourceType, Exception } from '../../Core';

import ShaderCapabilities, {
	blendFunction,
	compareFunction,
	cullingMode,
	ShaderBlendFunction,
	ShaderCapability,
	ShaderCompareFunction,
	ShaderCullingMode,
	ShaderDepthMask, ShaderStencilFunction, stencilFunction,
} from './ShaderCapabilities';

enum ShaderSection {
	Global = 'global',
	Vertex = 'vertex',
	Fragment = 'fragment',
	Caps = 'caps'
}

const SECTION_PATTERN: RegExp = new RegExp(`^(${ Object.values(ShaderSection).slice(1).join('|') });`);
const INCLUDE_PATTERN: RegExp = /#include\s+["'`]([\w/.]+)["'`]/;
const EXTENSION_PATTERN: RegExp = /#extension\s+GL_(\w+)\s*:\s*enable/;
const DEFINE_PATTERN: RegExp = /defined\s*\(\s*(\w+)\s*\)/;
const CAPABILITY_PATTERN: RegExp = new RegExp(`#(${ Object.values(ShaderCapability).join('|') })\\s+([\\w\\s]+)\\s*`);

interface Raw {
	readonly [ShaderSection.Global]: string[];
	readonly [ShaderSection.Vertex]: string[];
	readonly [ShaderSection.Fragment]: string[];
	readonly keywords: string[];

	readonly [key: string]: string[];
}

class ShaderParser {
	private readonly raw: Raw = {
		[ShaderSection.Global]: [],
		[ShaderSection.Vertex]: [],
		[ShaderSection.Fragment]: [],
		keywords: [],
	};

	private section: ShaderSection = ShaderSection.Global;

	private readonly includes: string[] = [];
	private readonly extensions: string[] = [];

	public readonly keywords: string[][] = [];

	public readonly capabilities: ShaderCapabilities = {
		[ShaderCapability.Blend]: false,
		[ShaderCapability.CullFace]: CullingMode.Back,
		[ShaderCapability.DepthTest]: CompareFunction.LessEqual,
		[ShaderCapability.DepthMask]: true,
		[ShaderCapability.StencilTest]: false,
		[ShaderCapability.ColorMask]: { r: true, g: true, b: true, a: true },
		[ShaderCapability.StencilOp]: {
			fail: StencilFunction.Keep,
			zFail: StencilFunction.Keep,
			zPass: StencilFunction.Keep,
		},
	};

	public readonly vertexSource: string[] = [];
	public readonly fragmentSource: string[] = [];

	private async parse(uri: string): Promise<void> {
		const path: string = Path.getDirectoryName(uri);

		let reader: TextReader;

		try {
			reader = await Resource.load<TextReader>(uri, ResourceType.GLSL);
		} catch (e) {
			throw new Exception(`ShaderParser: failed to load '${ uri }'`, e);
		}

		let index: number = 0;

		for (let line of reader) {
			index += 1;

			const origin = location.origin;
			const pathname = location.pathname;

			const debug: string = `${ origin }/${ Path.combine(pathname, uri) }:${ index }`;

			if (this.parseSection(line)) {
				continue;
			}

			if (this.section === ShaderSection.Caps) {
				this.parseCapability(line);
				continue;
			}

			try {
				if (await this.parseInclude(line, path)) {
					continue;
				}
			} catch (e) {
				throw new Exception(`ShaderParser: failed to parse include '${ path }'`, e);
			}

			line = this.parseExtension(line);

			this.parseDefine(line);

			this.raw[this.section].push(`/** ${ debug } */${ line }`);
		}
	}

	public async load(uri: string): Promise<void> {
		try {
			await this.parse(uri);
		} catch (e) {
			throw new Exception(`ShaderParser: failed to parse '${ uri }'`, e);
		}

		this.vertexSource.push(...this.raw[ShaderSection.Global].concat(this.raw[ShaderSection.Vertex]));
		this.fragmentSource.push(...this.raw[ShaderSection.Global].concat(this.raw[ShaderSection.Fragment]));

		this.apply();
	}

	private apply(): void {
		this.raw.keywords.sort();

		const count = this.raw.keywords.length;
		const total: number = 1 << count;

		for (let i = 0; i < total; i++) {
			this.keywords[i] = [];

			if (total <= 1) {
				continue;
			}

			for (let j = 0; j < count; j++) {
				if (((1 << j) & i) != 0) {
					this.keywords[i].push(this.raw.keywords[j]);
				}
			}

			this.keywords[i].sort();
		}
	}

	private parseDefine(line: string): void {
		const match: RegExpMatchArray = line.match(DEFINE_PATTERN) as RegExpMatchArray;

		if (!match) {
			return;
		}

		let [, define] = match;

		if (!this.raw.keywords.includes(define) && !this.extensions.includes(define)) {
			this.raw.keywords.push(define);
		}
	}

	private parseExtension(line: string): string {
		const match: RegExpMatchArray = line.match(EXTENSION_PATTERN) as RegExpMatchArray;

		if (!match) {
			return line;
		}

		const [, extension] = match;

		if (this.extensions.includes(extension)) {
			return line;
		}

		this.extensions.push(extension);

		if (Context.getExtension(extension) !== null) {
			line += `\n#define ${ extension }`;
		}

		return line;
	}

	private async parseInclude(line: string, path: string): Promise<boolean> {
		const match: RegExpMatchArray = line.match(INCLUDE_PATTERN) as RegExpMatchArray;

		if (!match) {
			return false;
		}

		const [, include] = match;

		const uri = Path.combine(path, include);

		if (!this.includes.includes(uri)) {
			this.includes.push(uri);

			try {
				await this.parse(uri);
			} catch (e) {
				throw new Exception(`ShaderParser: failed to parse '${ uri }'`, e);
			}
		}

		return true;
	}

	private parseCapability(line: string): void {
		const match: RegExpMatchArray = line.match(CAPABILITY_PATTERN) as RegExpMatchArray;

		if (!match) {
			return;
		}

		const [, cap, options]: string[] = match;

		const params: string[] = options.split(/\s+/);

		switch (cap as ShaderCapability) {
			case ShaderCapability.Blend: {
				const [dst, src]: string[] = params;

				if (dst === ShaderBlendFunction.Off) {
					this.capabilities[ShaderCapability.Blend] = false;
				} else {
					this.capabilities[ShaderCapability.Blend] = {
						src: blendFunction(src as ShaderBlendFunction),
						dst: blendFunction(dst as ShaderBlendFunction),
					};
				}

				break;
			}

			case ShaderCapability.CullFace: {
				const [mode]: string[] = params;

				this.capabilities[ShaderCapability.CullFace] = cullingMode(mode as ShaderCullingMode);

				break;
			}

			case ShaderCapability.DepthTest: {
				const [comp]: string[] = params;

				this.capabilities[ShaderCapability.DepthTest] = compareFunction(comp as ShaderCompareFunction);

				break;
			}

			case ShaderCapability.StencilTest: {
				const [func, ref, mask]: string[] = params;

				this.capabilities[ShaderCapability.StencilTest] = {
					func: compareFunction(func as ShaderCompareFunction),
					ref: +ref,
					mask: +mask,
				};

				break;
			}

			case ShaderCapability.StencilOp: {
				const [fail, zFail, zPass]: string[] = params;

				this.capabilities[ShaderCapability.StencilOp] = {
					fail: stencilFunction(fail as ShaderStencilFunction),
					zFail: stencilFunction(zFail as ShaderStencilFunction),
					zPass: stencilFunction(zPass as ShaderStencilFunction),
				};

				break;
			}

			case ShaderCapability.DepthMask: {
				const [flag]: string[] = params;

				this.capabilities[ShaderCapability.DepthMask] = (flag === ShaderDepthMask.On);

				break;
			}

			case ShaderCapability.ColorMask: {
				const mask: string[] = params.map((c: string): string[] => c.split('')).flat();

				for (let c in this.capabilities[ShaderCapability.ColorMask]) {
					this.capabilities[ShaderCapability.ColorMask][c] = mask.includes(c);
				}

				break;
			}

			default:
				throw new RangeError();
		}
	}

	private parseSection(line: string): boolean {
		const match: RegExpMatchArray = line.match(SECTION_PATTERN) as RegExpMatchArray;

		if (!match) {
			return false;
		}

		const [, section] = match;

		this.section = section as ShaderSection;

		return true;
	}
}

export default ShaderParser;