import Resource, { ResourceType } from '../../Helpers/Resource';
import TextReader from '../../Helpers/TextReader';
import gl from '..';

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
	[ShaderSection.Global]: string[];
	[ShaderSection.Vertex]: string[];
	[ShaderSection.Fragment]: string[];
	keywords: string[];
}

class ShaderParser {
	private readonly raw: Raw = {
		[ShaderSection.Global]: [],
		[ShaderSection.Vertex]: [],
		[ShaderSection.Fragment]: [],
		keywords: [],
	};

	private section: ShaderSection = ShaderSection.Global;
	private readonly extensions: string[] = [];

	public readonly keywords: string[][] = [];

	public vertexSource: string[] = [];
	public fragmentSource: string[] = [];

	private async parseSource(reader: TextReader): Promise<void> {
		for (let line of reader) {
			if (this.parseSection(line)) {
				continue;
			}

			if (await this.parseInclude(line)) {
				continue;
			}

			if (this.parseExtension(line)) {
				continue;
			}

			this.parseDefine(line);

			this.raw[this.section].push(line);
		}
	}

	public static async load(url: string): Promise<TextReader> {
		return await Resource.load<TextReader>(url, ResourceType.GLSL);
	}

	public async parse(reader: TextReader): Promise<void> {
		await this.parseSource(reader);

		this.vertexSource = this.raw[ShaderSection.Global].concat(this.raw[ShaderSection.Vertex]);
		this.fragmentSource = this.raw[ShaderSection.Global].concat(this.raw[ShaderSection.Fragment]);

		this.generateKeywords();
	}

	private generateKeywords(): void {
		this.raw.keywords.sort();

		const count = this.raw.keywords.length;
		const total = 1 << count;

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
		const match = line.match(DEFINE_PATTERN);

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

	private parseExtension(line: string): boolean {
		const match = line.match(EXTENSION_PATTERN);

		if (!match) {
			return false;
		}

		const [, extension] = match;

		if (!this.extensions.includes(extension)) {
			this.extensions.push(extension);

			if (gl.getExtensionRaw(extension) === null) {
				return false;
			}

			this.raw[this.section].push(`#define ${ extension }`);
		}

		return true;
	}

	private async parseInclude(line: string): Promise<boolean> {
		const match = line.match(INCLUDE_PATTERN);

		if (!match) {
			return false;
		}

		const [, url] = match;

		await this.parseSource(await ShaderParser.load(url));

		return true;
	}

	private parseSection(line: string): boolean {
		const match = line.match(SECTION_PATTERN);

		if (!match) {
			return false;
		}

		const [, section] = match;

		this.section = section as ShaderSection;

		return true;
	}
}

export default ShaderParser;