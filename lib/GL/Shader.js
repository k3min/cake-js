import GL from './GL';
import ShaderParser from './Helpers/ShaderParser';
import ShaderProgram, { ShaderType } from './ShaderProgram';
import BindableObject from '../Helpers/BindableObject';
import Path from '../Helpers/Path';
import Storage from '../Helpers/Storage';
import Vector2 from '../Math/Vector2';
import Vector3 from '../Math/Vector3';
import Vector4 from '../Math/Vector4';
/**
 * @todo Implement blending, culling, etc.
 */
class Shader extends BindableObject {
    constructor() {
        super(...arguments);
        this.name = 'Shader';
        this.variants = new Storage();
        this.parser = new ShaderParser();
        this.textureIndices = [];
        this.textureIndex = 0;
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
        await shader.parser.load(url);
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
    setFloat(name, value) {
        this.bind();
        const uniform = this.uniforms.get(name);
        if (!uniform) {
            if (!name.startsWith('cake')) {
                this.uniformNotFound('float', name);
            }
            return;
        }
        GL.uniform1f(uniform, value);
    }
    setInt(name, value) {
        this.bind();
        const uniform = this.uniforms.get(name);
        if (!uniform) {
            if (!name.startsWith('cake')) {
                this.uniformNotFound('int', name);
            }
            return;
        }
        GL.uniform1i(uniform, value);
    }
    setMatrix4x4(name, value) {
        this.bind();
        const uniform = this.uniforms.get(name);
        if (!uniform) {
            if (!name.startsWith('cake')) {
                this.uniformNotFound('Matrix4x4', name);
            }
            return;
        }
        GL.uniformMatrix4fv(uniform, false, value);
    }
    setVector(name, value) {
        this.bind();
        const uniform = this.uniforms.get(name);
        if (!uniform) {
            if (!name.startsWith('cake')) {
                this.uniformNotFound(`Vector${value.length}`, name);
            }
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
    setTexture(name, texture) {
        this.bind();
        const uniform = this.uniforms.get(name);
        if (!uniform) {
            if (!name.startsWith('cake')) {
                this.uniformNotFound('Texture', name);
            }
            return;
        }
        if (texture) {
            const name2 = `${name}_TexelSize`;
            const value2 = texture.texelSize;
            const uniform2 = this.uniforms.get(name2);
            if (uniform2) {
                GL.uniform4fv(uniform2, value2);
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
    onUnbind() {
        this.variant.unbind();
    }
    onBind() {
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
    uniformNotFound(type, name) {
        console.warn(`Shader (${this.name}): uniform (${type}) ${name} not found!`);
    }
}
Shader.floats = new Storage();
Shader.ints = new Storage();
Shader.vectors = new Storage();
Shader.matrices = new Storage();
Shader.textures = new Storage();
export default Shader;
