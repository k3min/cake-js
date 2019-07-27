import Context from '../../GL';
import { CompareFunction, CullingMode, StencilFunction } from '../../GL/Helpers';
import { Path, Resource, ResourceType, Exception } from '../../Core';
import { blendFunction, compareFunction, cullingMode, ShaderBlendFunction, ShaderCapability, ShaderDepthMask, stencilFunction, } from './ShaderCapabilities';
var ShaderSection;
(function (ShaderSection) {
    ShaderSection["Global"] = "global";
    ShaderSection["Vertex"] = "vertex";
    ShaderSection["Fragment"] = "fragment";
    ShaderSection["Caps"] = "caps";
})(ShaderSection || (ShaderSection = {}));
const SECTION_PATTERN = new RegExp(`^(${Object.values(ShaderSection).slice(1).join('|')});`);
const INCLUDE_PATTERN = /#include\s+["'`]([\w/.]+)["'`]/;
const EXTENSION_PATTERN = /#extension\s+GL_(\w+)\s*:\s*enable/;
const DEFINE_PATTERN = /defined\s*\(\s*(\w+)\s*\)/;
const CAPABILITY_PATTERN = new RegExp(`#(${Object.values(ShaderCapability).join('|')})\\s+([\\w\\s]+)\\s*`);
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
        this.capabilities = {
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
        this.vertexSource = [];
        this.fragmentSource = [];
    }
    async parse(uri) {
        const path = Path.getDirectoryName(uri);
        let reader;
        try {
            reader = await Resource.load(uri, ResourceType.GLSL);
        }
        catch (e) {
            throw new Exception(`ShaderParser: failed to load '${uri}'`, e);
        }
        let index = 0;
        for (let line of reader) {
            index += 1;
            const origin = location.origin;
            const pathname = location.pathname;
            const debug = `${origin}/${Path.combine(pathname, uri)}:${index}`;
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
            }
            catch (e) {
                throw new Exception(`ShaderParser: failed to parse include '${path}'`, e);
            }
            line = this.parseExtension(line);
            this.parseDefine(line);
            this.raw[this.section].push(`/** ${debug} */${line}`);
        }
    }
    async load(uri) {
        try {
            await this.parse(uri);
        }
        catch (e) {
            throw new Exception(`ShaderParser: failed to parse '${uri}'`, e);
        }
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
            return;
        }
        let [, define] = match;
        if (!this.raw.keywords.includes(define) && !this.extensions.includes(define)) {
            this.raw.keywords.push(define);
        }
    }
    parseExtension(line) {
        const match = line.match(EXTENSION_PATTERN);
        if (!match) {
            return line;
        }
        const [, extension] = match;
        if (this.extensions.includes(extension)) {
            return line;
        }
        this.extensions.push(extension);
        if (Context.getExtension(extension) !== null) {
            line += `\n#define ${extension}`;
        }
        return line;
    }
    async parseInclude(line, path) {
        const match = line.match(INCLUDE_PATTERN);
        if (!match) {
            return false;
        }
        const [, include] = match;
        const uri = Path.combine(path, include);
        if (!this.includes.includes(uri)) {
            this.includes.push(uri);
            try {
                await this.parse(uri);
            }
            catch (e) {
                throw new Exception(`ShaderParser: failed to parse '${uri}'`, e);
            }
        }
        return true;
    }
    parseCapability(line) {
        const match = line.match(CAPABILITY_PATTERN);
        if (!match) {
            return;
        }
        const [, cap, options] = match;
        const params = options.split(/\s+/);
        switch (cap) {
            case ShaderCapability.Blend: {
                const [dst, src] = params;
                if (dst === ShaderBlendFunction.Off) {
                    this.capabilities[ShaderCapability.Blend] = false;
                }
                else {
                    this.capabilities[ShaderCapability.Blend] = {
                        src: blendFunction(src),
                        dst: blendFunction(dst),
                    };
                }
                break;
            }
            case ShaderCapability.CullFace: {
                const [mode] = params;
                this.capabilities[ShaderCapability.CullFace] = cullingMode(mode);
                break;
            }
            case ShaderCapability.DepthTest: {
                const [comp] = params;
                this.capabilities[ShaderCapability.DepthTest] = compareFunction(comp);
                break;
            }
            case ShaderCapability.StencilTest: {
                const [func, ref, mask] = params;
                this.capabilities[ShaderCapability.StencilTest] = {
                    func: compareFunction(func),
                    ref: +ref,
                    mask: +mask,
                };
                break;
            }
            case ShaderCapability.StencilOp: {
                const [fail, zFail, zPass] = params;
                this.capabilities[ShaderCapability.StencilOp] = {
                    fail: stencilFunction(fail),
                    zFail: stencilFunction(zFail),
                    zPass: stencilFunction(zPass),
                };
                break;
            }
            case ShaderCapability.DepthMask: {
                const [flag] = params;
                this.capabilities[ShaderCapability.DepthMask] = (flag === ShaderDepthMask.On);
                break;
            }
            case ShaderCapability.ColorMask: {
                const mask = params.map((c) => c.split('')).flat();
                for (let c in this.capabilities[ShaderCapability.ColorMask]) {
                    this.capabilities[ShaderCapability.ColorMask][c] = mask.includes(c);
                }
                break;
            }
            default:
                throw new RangeError();
        }
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
