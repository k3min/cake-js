import Null from '../../Helpers/Null';
import Path from '../../Helpers/Path';
import Resource, { ResourceType } from '../../Helpers/Resource';
import TextReader from '../../Helpers/TextReader';
import gl from '../GL';

export enum ShaderSection {
	Global = 'global',
	Vertex = 'vertex',
	Fragment = 'fragment'
}

const SECTION_PATTERN = /(fragment|vertex):/;
const INCLUDE_PATTERN = /#include\s+["'`](.*?)["'`]/;
const EXTENSION_PATTERN = /#extension\s+GL_(.*?)\s*:\s*enable/;
const DEFINE_PATTERN = /defined\((.*?)\)/;

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

	public readonly vertexSource: string[] = [];
	public readonly fragmentSource: string[] = [];

	private async parse(url: string): Promise<void> {
		const path: string = Path.getDirectoryName(url);
		const reader: TextReader = await Resource.load<TextReader>(url, ResourceType.GLSL);

		let index: number = 0;

		for (let line of reader) {
			index += 1;

			const origin = location.origin;
			const pathname = location.pathname;

			const debug: string = `@${ origin }/${ Path.combine(pathname, url) }:${ index }`;

			if (this.parseSection(line)) {
				continue;
			}

			if (await this.parseInclude(line, path)) {
				continue;
			}

			const extension = this.parseExtension(line);

			if (extension === null) {
				continue;
			}

			line += extension;

			this.parseDefine(line);

			this.raw[this.section].push(`/** ${ debug } */${ line }`);
		}
	}

	public async load(url: string): Promise<void> {
		await this.parse(url);

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

	private parseDefine(line: string): boolean {
		const match: RegExpMatchArray = line.match(DEFINE_PATTERN) as RegExpMatchArray;

		if (!match) {
			return false;
		}

		let [, define] = match;

		define = define.trim();

		if (!this.raw.keywords.includes(define) && !this.extensions.includes(define)) {
			this.raw.keywords.push(define);
		}

		return true;
	}

	private parseExtension(line: string): Null<string> {
		const match: RegExpMatchArray = line.match(EXTENSION_PATTERN) as RegExpMatchArray;

		if (!match) {
			return '';
		}

		const [, extension] = match;

		if (this.extensions.includes(extension)) {
			return '';
		}

		this.extensions.push(extension);

		if (gl.getExtensionRaw(extension) === null) {
			return null;
		}

		return `\n#define ${ extension }`;
	}

	private async parseInclude(line: string, path: string): Promise<boolean> {
		const match: RegExpMatchArray = line.match(INCLUDE_PATTERN) as RegExpMatchArray;

		if (!match) {
			return false;
		}

		const [, include] = match;

		const url = Path.combine(path, include);

		if (!this.includes.includes(url)) {
			this.includes.push(url);

			await this.parse(url);
		}

		return true;
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