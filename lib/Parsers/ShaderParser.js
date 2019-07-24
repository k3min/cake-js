import { Path, Resource, ResourceType } from '../Helpers';
import gl from '../GL';
var ShaderSection;
(function (ShaderSection) {
    ShaderSection["Global"] = "global";
    ShaderSection["Vertex"] = "vertex";
    ShaderSection["Fragment"] = "fragment";
})(ShaderSection || (ShaderSection = {}));
const SECTION_PATTERN = /(fragment|vertex):/;
const INCLUDE_PATTERN = /#include\s+["'`](.*?)["'`]/;
const EXTENSION_PATTERN = /#extension\s+GL_(.*?)\s*:\s*enable/;
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
        this.includes = [];
        this.extensions = [];
        this.keywords = [];
        this.vertexSource = [];
        this.fragmentSource = [];
    }
    async parse(url) {
        const path = Path.getDirectoryName(url);
        const reader = await Resource.load(url, ResourceType.GLSL);
        let index = 0;
        for (let line of reader) {
            index += 1;
            const origin = location.origin;
            const pathname = location.pathname;
            const debug = `@${origin}/${Path.combine(pathname, url)}:${index}`;
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
            this.raw[this.section].push(`/** ${debug} */${line}`);
        }
    }
    async load(url) {
        await this.parse(url);
        this.vertexSource.push(...this.raw[ShaderSection.Global].concat(this.raw[ShaderSection.Vertex]));
        this.fragmentSource.push(...this.raw[ShaderSection.Global].concat(this.raw[ShaderSection.Fragment]));
        this.apply();
    }
    apply() {
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
        let [, define] = match;
        define = define.trim();
        if (!this.raw.keywords.includes(define) && !this.extensions.includes(define)) {
            this.raw.keywords.push(define);
        }
        return true;
    }
    parseExtension(line) {
        const match = line.match(EXTENSION_PATTERN);
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
        return `\n#define ${extension}`;
    }
    async parseInclude(line, path) {
        const match = line.match(INCLUDE_PATTERN);
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
