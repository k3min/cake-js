import Storage from '../Helpers/Storage';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import GL from './GL';
const ERROR_PATTERN = /ERROR: \d+:(\d+): '(\w+)' : (.*)/;
const STACK_PATTERN = /^\/\*\* @(.*) \*\//;
export var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["Fragment"] = 35632] = "Fragment";
    ShaderType[ShaderType["Vertex"] = 35633] = "Vertex";
})(ShaderType || (ShaderType = {}));
class ShaderProgram extends BindableGraphicsObject {
    constructor() {
        super(() => GL.createProgram(), (handle) => GL.useProgram(handle), (handle) => GL.deleteProgram(handle));
        this.name = 'ShaderProgram';
        this.attributes = new Storage();
        this.uniforms = new Storage();
        this.vertex = null;
        this.fragment = null;
        this.vertexSource = '';
        this.fragmentSource = '';
    }
    get identifier() {
        return 'ShaderProgram';
    }
    apply() {
        GL.linkProgram(this.handle);
        if (GL.getProgramParameter(this.handle, GL.LINK_STATUS) <= 0) {
            const log = GL.getProgramInfoLog(this.handle);
            this.dispose();
            throw new Error(log);
        }
        for (let index = 0; index < GL.getProgramParameter(this.handle, GL.ACTIVE_ATTRIBUTES); index++) {
            const info = GL.getActiveAttrib(this.handle, index);
            this.attributes.set(info.name, index);
        }
        for (let index = 0; index < GL.getProgramParameter(this.handle, GL.ACTIVE_UNIFORMS); index++) {
            const info = GL.getActiveUniform(this.handle, index);
            this.uniforms.set(info.name, GL.getUniformLocation(this.handle, info.name));
        }
    }
    attach(type, sources) {
        const shader = GL.createShader(type);
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
                throw new RangeError();
        }
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if (GL.getShaderParameter(shader, GL.COMPILE_STATUS) > 0) {
            GL.attachShader(this.handle, shader);
            return true;
        }
        const log = GL.getShaderInfoLog(shader);
        this.dispose();
        let errors = log.split('\n');
        errors = errors.map((line) => {
            const match = line.match(ERROR_PATTERN);
            if (!match) {
                return '';
            }
            const [, number, fn, error] = match;
            const source = sources[(+number) - 1].trim();
            const match2 = source.match(STACK_PATTERN);
            if (!match2) {
                return '';
            }
            const [, stack] = match2;
            return `${error[0].toUpperCase() + error.slice(1)} (${fn}@${stack})`;
        });
        errors = errors.filter((error) => !!error);
        console.error(`ShaderProgram (${this.name}): SyntaxError\n${errors.join('\n')}\n`);
        return false;
    }
    disposing() {
        if (this.vertex) {
            GL.deleteShader(this.vertex);
        }
        if (this.fragment) {
            GL.deleteShader(this.fragment);
        }
        super.disposing();
    }
}
export default ShaderProgram;
