import { Path } from '../Core';
import { BindableObject, Storage } from '../Core/Helpers';
import Exception from '../Core/Exception';
import { Vector2, Vector3, Vector4 } from '../Math';
import { ShaderParser, ShaderCapability } from '../Parsers';
import GL from './GL';
import Capability from './Helpers/Capability';
import ShaderProgram, { ShaderType } from './ShaderProgram';
import Texture2D from './Texture2D';
class Shader extends BindableObject {
    constructor() {
        super(...arguments);
        this.name = 'Shader';
        this.variants = new Storage();
        this.parser = new ShaderParser();
        this.textureIndices = [];
        this.textureIndex = 0;
        this.log = {};
    }
    get attributes() {
        return this.variant.attributes;
    }
    get uniforms() {
        return this.variant.uniforms;
    }
    set keywords(value) {
        let id = '';
        if (value && value.length > 0) {
            id = value.sort().join('');
        }
        const variant = this.variants.get(id);
        if (!variant) {
            throw new ReferenceError(`Shader (${this.name}): variant '${id || 'default'}' not found`);
        }
        this.variant = variant;
    }
    get identifier() {
        return 'Shader';
    }
    static async load(url) {
        const shader = new Shader();
        shader.name = Path.getFileName(url);
        try {
            await shader.parser.load(url);
        }
        catch (e) {
            throw new Exception(`Shader: failed to load '${url}'`, e);
        }
        shader.apply();
        return shader;
    }
    apply() {
        this.parser.keywords.forEach((keywords) => {
            const defines = [];
            keywords.forEach((keyword) => defines.push(`#define ${keyword}`));
            const attachment = new ShaderProgram();
            attachment.name = this.name;
            if (!attachment.attach(ShaderType.Vertex, defines.concat(this.parser.vertexSource))) {
                return;
            }
            if (!attachment.attach(ShaderType.Fragment, defines.concat(this.parser.fragmentSource))) {
                return;
            }
            attachment.apply();
            this.variants.set(keywords.join(''), attachment);
        });
        this.keywords = null;
    }
    logUniformNotFound(name, type) {
        const id = `${name} (${type})`;
        const log = `Shader (${this.name}): uniform ${id} not found`;
        if (id in this.log) {
            return;
        }
        console.warn(log);
        this.log[id] = log;
    }
    getUniform(name, type, check = true) {
        this.bind();
        const uniform = this.uniforms.get(name);
        if (uniform) {
            return uniform;
        }
        if (check && !name.startsWith('cake')) {
            this.logUniformNotFound(name, type);
        }
        return null;
    }
    setFloat(name, value, check = true) {
        const uniform = this.getUniform(name, 'float', check);
        if (!uniform) {
            return;
        }
        GL.uniform1f(uniform, value);
    }
    setInt(name, value, check = true) {
        const uniform = this.getUniform(name, 'int', check);
        if (!uniform) {
            return;
        }
        GL.uniform1i(uniform, value);
    }
    setMatrix4x4(name, value, check = true) {
        const uniform = this.getUniform(name, 'Matrix4x4', check);
        if (!uniform) {
            return;
        }
        GL.uniformMatrix4fv(uniform, false, value);
    }
    setVector(name, value, check = true) {
        const uniform = this.getUniform(name, `Vector${value.length}`, check);
        if (!uniform) {
            return;
        }
        switch (value.length) {
            case Vector2.LENGTH:
                GL.uniform2fv(uniform, value);
                break;
            case Vector3.LENGTH:
                GL.uniform3fv(uniform, value);
                break;
            case Vector4.LENGTH:
                GL.uniform4fv(uniform, value);
                break;
        }
    }
    setTexture(name, texture, check = true) {
        const uniform = this.getUniform(name, 'texture', check);
        if (!uniform) {
            return;
        }
        if (texture instanceof Texture2D) {
            const uniform2 = this.getUniform(`${name}_TexelSize`, 'Vector4', false);
            if (uniform2) {
                GL.uniform4fv(uniform2, texture.texelSize);
            }
        }
        let index = this.textureIndices.indexOf(name);
        if (index === -1) {
            index = this.textureIndex++;
            this.textureIndices[index] = name;
        }
        GL.activeTexture(GL.TEXTURE0 + index);
        texture.bind();
        GL.uniform1i(uniform, index);
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
    setCap(cap) {
        const value = this.parser.capabilities[cap];
        switch (cap) {
            case ShaderCapability.StencilTest: {
                if (value) {
                    const { func, ref, mask } = value;
                    GL.enable(Capability.StencilTest);
                    GL.stencilFunc(func, ref, mask);
                }
                else {
                    GL.disable(Capability.StencilTest);
                }
                break;
            }
            case ShaderCapability.DepthTest: {
                const func = value;
                GL.enable(Capability.DepthTest);
                GL.depthFunc(func);
                break;
            }
            case ShaderCapability.Blend: {
                if (value) {
                    const { src, dst } = value;
                    GL.enable(Capability.Blend);
                    GL.blendFunc(src, dst);
                }
                else {
                    GL.disable(Capability.Blend);
                }
                break;
            }
            case ShaderCapability.CullFace: {
                if (value) {
                    const mode = value;
                    GL.enable(Capability.CullFace);
                    GL.cullFace(mode);
                }
                else {
                    GL.disable(Capability.CullFace);
                }
                break;
            }
            case ShaderCapability.DepthMask: {
                GL.depthMask(!!value);
                break;
            }
            case ShaderCapability.ColorMask: {
                const { r, g, b, a } = value;
                GL.colorMask(r, g, b, a);
                break;
            }
            default:
                throw new RangeError(`Shader (${this.name}): unknown cap '${cap}'`);
        }
    }
    unbinding() {
        this.variant.unbind();
    }
    binding() {
        for (let cap of Object.values(ShaderCapability)) {
            this.setCap(cap);
        }
        this.variant.bind();
        Shader.floats.forEach((value, name) => this.setFloat(name, value));
        Shader.ints.forEach((value, name) => this.setInt(name, value));
        Shader.vectors.forEach((value, name) => this.setVector(name, value));
        Shader.matrices.forEach((value, name) => this.setMatrix4x4(name, value));
        Shader.textures.forEach((value, name) => this.setTexture(name, value));
    }
    disposing() {
        this.variants.forEach((variant) => variant.dispose());
        this.variants.clear();
    }
}
Shader.floats = new Storage();
Shader.ints = new Storage();
Shader.vectors = new Storage();
Shader.matrices = new Storage();
Shader.textures = new Storage();
export default Shader;
