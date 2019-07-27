import { Storage } from '../Core/Helpers';
import { BindableGraphicsObject } from './Helpers';
import Context from './Context';
const ERROR_PATTERN = /ERROR: \d+:(\d+): '(\w+)' : (.*)/;
const STACK_PATTERN = /^\/\*\* (.*) \*\//;
export var ShaderType;
(function (ShaderType) {
    ShaderType[ShaderType["Fragment"] = 35632] = "Fragment";
    ShaderType[ShaderType["Vertex"] = 35633] = "Vertex";
})(ShaderType || (ShaderType = {}));
class ShaderProgram extends BindableGraphicsObject {
    constructor() {
        super(() => Context.createProgram(), (handle) => Context.useProgram(handle), (handle) => Context.deleteProgram(handle));
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
        Context.linkProgram(this.handle);
        if (Context.getProgramParameter(this.handle, Context.LINK_STATUS) <= 0) {
            const log = Context.getProgramInfoLog(this.handle);
            this.dispose();
            throw new Error(log);
        }
        for (let index = 0; index < Context.getProgramParameter(this.handle, Context.ACTIVE_ATTRIBUTES); index++) {
            const info = Context.getActiveAttrib(this.handle, index);
            this.attributes.set(info.name, index);
        }
        for (let index = 0; index < Context.getProgramParameter(this.handle, Context.ACTIVE_UNIFORMS); index++) {
            const info = Context.getActiveUniform(this.handle, index);
            this.uniforms.set(info.name, Context.getUniformLocation(this.handle, info.name));
        }
    }
    attach(type, sources) {
        const shader = Context.createShader(type);
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
        Context.shaderSource(shader, source);
        Context.compileShader(shader);
        if (Context.getShaderParameter(shader, Context.COMPILE_STATUS) > 0) {
            Context.attachShader(this.handle, shader);
            return true;
        }
        const log = Context.getShaderInfoLog(shader);
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
            Context.deleteShader(this.vertex);
        }
        if (this.fragment) {
            Context.deleteShader(this.fragment);
        }
        super.disposing();
    }
}
export default ShaderProgram;
