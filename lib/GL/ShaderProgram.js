import Storage from '../Helpers/Storage';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import gl from './index';
export var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["Vertex"] = gl.VERTEX_SHADER] = "Vertex";
    ShaderType[ShaderType["Fragment"] = gl.FRAGMENT_SHADER] = "Fragment";
})(ShaderType || (ShaderType = {}));
class ShaderProgram extends BindableGraphicsObject {
    constructor() {
        super(gl.createProgram, gl.useProgram, gl.deleteProgram);
        this.attributes = new Storage();
        this.uniforms = new Storage();
        this.vertex = null;
        this.fragment = null;
        this.vertexSource = '';
        this.fragmentSource = '';
    }
    get identifier() {
        return 'shaderProgram';
    }
    apply() {
        gl.linkProgram(this.handle);
        if (gl.getProgramParameter(this.handle, gl.LINK_STATUS) <= 0) {
            const log = gl.getProgramInfoLog(this.handle);
            this.dispose();
            throw new Error(log);
        }
        for (let index = 0; index < gl.getProgramParameter(this.handle, gl.ACTIVE_ATTRIBUTES); index++) {
            const { name } = gl.getActiveAttrib(this.handle, index);
            this.attributes.set(name, index);
        }
        for (let index = 0; index < gl.getProgramParameter(this.handle, gl.ACTIVE_UNIFORMS); index++) {
            const { name } = gl.getActiveUniform(this.handle, index);
            this.uniforms.set(name, gl.getUniformLocation(this.handle, name));
        }
    }
    attach(type, sources) {
        const shader = gl.createShader(type);
        const source = sources.join('\n');
        switch (type) {
            case ShaderType.Vertex:
                this.vertex = shader;
                this.vertexSource = source;
                break;
            case ShaderType.Fragment:
                this.fragment = shader;
                this.fragmentSource = source;
                break;
            default:
                throw new Error();
        }
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) <= 0) {
            const log = gl.getShaderInfoLog(shader);
            this.dispose();
            throw new SyntaxError(log);
        }
        gl.attachShader(this.handle, shader);
    }
    dispose() {
        super.dispose();
        if (this.vertex) {
            gl.deleteShader(this.vertex);
        }
        if (this.fragment) {
            gl.deleteShader(this.fragment);
        }
    }
}
export default ShaderProgram;
