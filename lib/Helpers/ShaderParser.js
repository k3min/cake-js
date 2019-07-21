import Resource, { ResourceType } from './Resource';
export var ShaderSection;
(function (ShaderSection) {
    ShaderSection["Global"] = "global";
    ShaderSection["Vertex"] = "vertex";
    ShaderSection["Fragment"] = "fragment";
})(ShaderSection || (ShaderSection = {}));
const SECTION_PATTERN = /(fragment|vertex):/;
const INCLUDE_PATTERN = /#include ["'`](.*?)["'`]/;
const DEFINE_PATTERN = /defined\((.*?)\)/;
class ShaderParser {
    constructor() {
        this.raw = {
            [ShaderSection.Global]: [],
            [ShaderSection.Vertex]: [],
            [ShaderSection.Fragment]: [],
            keywords: [],
        };
        this.section = ShaderSection.Global;
        this.keywords = [];
        this.vertexSource = [];
        this.fragmentSource = [];
    }
    async parseSource(reader) {
        for (let line of reader) {
            if (this.parseSection(line)) {
                continue;
            }
            if (await this.parseInclude(line)) {
                continue;
            }
            this.parseDefine(line);
            this.raw[this.section].push(line);
        }
    }
    static async load(url) {
        return await Resource.load(url, ResourceType.GLSL);
    }
    async parse(reader) {
        await this.parseSource(reader);
        this.vertexSource = this.raw[ShaderSection.Global].concat(this.raw[ShaderSection.Vertex]);
        this.fragmentSource = this.raw[ShaderSection.Global].concat(this.raw[ShaderSection.Fragment]);
        this.generateKeywords();
    }
    generateKeywords() {
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
    parseDefine(line) {
        const match = line.match(DEFINE_PATTERN);
        if (!match) {
            return false;
        }
        const [, define] = match;
        if (!this.raw.keywords.includes(define)) {
            this.raw.keywords.push(define);
        }
        return true;
    }
    async parseInclude(line) {
        const match = line.match(INCLUDE_PATTERN);
        if (!match) {
            return false;
        }
        const [, url] = match;
        await this.parseSource(await ShaderParser.load(url));
        return true;
    }
    parseSection(line) {
        const match = line.match(SECTION_PATTERN);
        if (!match) {
            return false;
        }
        const [, section] = match;
        this.section = section;
        return true;
    }
}
export default ShaderParser;
