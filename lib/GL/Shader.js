import { Exception, Path, Base, Log } from '../Core';
import { Storage } from '../Core/Helpers';
import { Vector2, Vector3, Vector4 } from '../Math';
import { ShaderCapability, ShaderParser, } from '../Parsers';
import Context from './Context';
import { Capability } from './Helpers';
import ShaderProgram, { ShaderType } from './ShaderProgram';
import Texture from './Texture';
/**
 * @todo Unset uniforms without (valid) value
 * @todo Warn about wrong attribute type
 */
class Shader extends Base {
    constructor() {
        super(...arguments);
        this.name = 'Shader';
        this.variants = new Storage();
        this.parser = new ShaderParser();
        this.textureIndices = [];
        this.log = [];
    }
    static get bound() {
        return Shader._bound;
    }
    get attributes() {
        return this._variant.attributes;
    }
    get uniforms() {
        return this._variant.uniforms;
    }
    get variant() {
        return this._variant;
    }
    get keywords() {
        return this._variant.keywords;
    }
    set keywords(value) {
        let id = 'default';
        if (value && value.length > 0) {
            id = value.sort().toString();
        }
        const variant = this.variants.get(id);
        if (!variant) {
            throw new ReferenceError(`Shader (${this.name}): variant '${id}' not found`);
        }
        this._variant = variant;
    }
    static async load(uri) {
        const shader = new Shader();
        shader.name = Path.getFileName(uri);
        try {
            await shader.parser.load(uri);
        }
        catch (e) {
            throw new Exception(`Shader: failed to load '${uri}'`, e);
        }
        shader.apply();
        return shader;
    }
    apply() {
        this.parser.keywords.forEach((keywords) => {
            const defines = keywords.map((keyword) => `#define ${keyword}`);
            const id = keywords.sort().toString() || 'default';
            const attachment = new ShaderProgram(keywords);
            attachment.name = `${this.name} (${id})`;
            defines.unshift('#version 300 es');
            if (!attachment.attach(ShaderType.Vertex, [...defines, ...this.parser.vertexSource])) {
                return;
            }
            if (!attachment.attach(ShaderType.Fragment, [...defines, ...this.parser.fragmentSource])) {
                return;
            }
            attachment.apply();
            this.variants.set(id, attachment);
        });
        this.keywords = null;
    }
    logUniformNotFound(name, type) {
        const uniform = `'${name}' (${type})`;
        const variant = this._variant.id;
        const log = `Shader (${this.name}): uniform ${uniform} not found (variant '${variant}')`;
        if (this.log.includes(log)) {
            return;
        }
        Log.warn(log);
        this.log.push(log);
    }
    getUniform(name, type, check = true) {
        this.bind();
        const uniform = this._variant.uniforms.get(name);
        if (uniform !== undefined) {
            return uniform;
        }
        if (check && !name.startsWith('cake')) {
            this.logUniformNotFound(name, type);
        }
        return null;
    }
    setColor(name, value, check = true) {
        const uniform = this.getUniform(name, 'Color', check);
        if (uniform === undefined) {
            return;
        }
        Context.uniform4fv(uniform, value.linear);
    }
    setFloat(name, value, check = true) {
        const uniform = this.getUniform(name, 'float', check);
        if (uniform === undefined) {
            return;
        }
        Context.uniform1f(uniform, value);
    }
    setInt(name, value, check = true) {
        const uniform = this.getUniform(name, 'int', check);
        if (uniform === undefined) {
            return;
        }
        Context.uniform1i(uniform, value);
    }
    setMatrix4x4(name, value, check = true) {
        const uniform = this.getUniform(name, 'Matrix4x4', check);
        if (uniform === undefined) {
            return;
        }
        Context.uniformMatrix4fv(uniform, false, value);
    }
    setVector(name, value, check = true) {
        const uniform = this.getUniform(name, `Vector${value.length}`, check);
        if (uniform === undefined) {
            return;
        }
        switch (value.length) {
            case Vector2.LENGTH:
                Context.uniform2fv(uniform, value);
                break;
            case Vector3.LENGTH:
                Context.uniform3fv(uniform, value);
                break;
            case Vector4.LENGTH:
                Context.uniform4fv(uniform, value);
                break;
        }
    }
    setTexture(name, texture, check = true) {
        if (!texture || texture.disposed) {
            throw new ReferenceError(`Shader (${this.name}): invalid Texture '${name}'`);
        }
        const uniform = this.getUniform(name, 'Texture', check);
        if (uniform === undefined) {
            return;
        }
        if (texture instanceof Texture) {
            const uniform2 = this.getUniform(`${name}_TexelSize`, 'Vector4', false);
            if (uniform2 !== undefined) {
                Context.uniform4fv(uniform2, texture.texelSize);
            }
        }
        let index = this.textureIndices.indexOf(name);
        if (index === -1) {
            index = this.textureIndices.push(name) - 1;
        }
        Context.activeTexture(Context.TEXTURE0 + index);
        texture.bind();
        Context.uniform1i(uniform, index);
    }
    static setFloat(name, value) {
        Shader.floats.set(name, value);
    }
    static setInt(name, value) {
        Shader.ints.set(name, value);
    }
    static setVector(name, value) {
        Shader.vectors.set(name, value);
    }
    static setMatrix4x4(name, value) {
        Shader.matrices.set(name, value);
    }
    static setTexture(name, value) {
        Shader.textures.set(name, value);
    }
    static setColor(name, value) {
        Shader.colors.set(name, value);
    }
    setCap(cap) {
        const value = this.parser.capabilities[cap];
        switch (cap) {
            case ShaderCapability.StencilTest: {
                if (value === false) {
                    Context.disable(Capability.StencilTest);
                }
                else {
                    const { func, ref, mask } = value;
                    Context.enable(Capability.StencilTest);
                    Context.stencilFunc(func, ref, mask);
                }
                break;
            }
            case ShaderCapability.StencilOp: {
                const { fail, zFail, zPass } = value;
                Context.stencilOp(fail, zFail, zPass);
                break;
            }
            case ShaderCapability.DepthTest: {
                const func = value;
                Context.enable(Capability.DepthTest);
                Context.depthFunc(func);
                break;
            }
            case ShaderCapability.Blend: {
                if (value === false) {
                    Context.disable(Capability.Blend);
                }
                else {
                    Context.enable(Capability.Blend);
                    const { srcRGB, dstRGB, srcA, dstA } = value;
                    if (srcA !== false && dstA !== false) {
                        Context.blendFuncSeparate(srcRGB, dstRGB, srcA, dstA);
                    }
                    else {
                        Context.blendFunc(srcRGB, dstRGB);
                    }
                }
                break;
            }
            case ShaderCapability.CullFace: {
                if (value === false) {
                    Context.disable(Capability.CullFace);
                }
                else {
                    const mode = value;
                    Context.enable(Capability.CullFace);
                    Context.cullFace(mode);
                }
                break;
            }
            case ShaderCapability.DepthMask: {
                Context.depthMask(value);
                break;
            }
            case ShaderCapability.ColorMask: {
                const { r, g, b, a } = value;
                Context.colorMask(r, g, b, a);
                break;
            }
        }
    }
    unbind() {
        if (!this._variant.unbind()) {
            return false;
        }
        Shader._bound = null;
        return true;
    }
    bind() {
        if (!this._variant.bind()) {
            return false;
        }
        Shader._bound = this;
        Object.values(ShaderCapability).forEach((cap) => this.setCap(cap));
        Shader.floats.forEach((value, name) => this.setFloat(name, value));
        Shader.ints.forEach((value, name) => this.setInt(name, value));
        Shader.vectors.forEach((value, name) => this.setVector(name, value));
        Shader.matrices.forEach((value, name) => this.setMatrix4x4(name, value));
        Shader.textures.forEach((value, name) => this.setTexture(name, value));
        Shader.colors.forEach((value, name) => this.setColor(name, value));
        return true;
    }
    disposing() {
        this.variants.forEach((variant) => variant.dispose());
        this.variants.clear();
    }
}
Shader._bound = null;
Shader.floats = new Storage();
Shader.ints = new Storage();
Shader.vectors = new Storage();
Shader.matrices = new Storage();
Shader.textures = new Storage();
Shader.colors = new Storage();
export default Shader;
