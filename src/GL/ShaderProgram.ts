import Null from '../Helpers/Null';
import Storage from '../Helpers/Storage';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import gl from './index';

export type ShaderAttribute = number | undefined;
export type ShaderUniform = Null<WebGLUniformLocation>;

class ShaderProgram extends BindableGraphicsObject<ShaderProgram, WebGLProgram> {
	public attributes: Storage<ShaderAttribute> = new Storage<ShaderAttribute>();
	public uniforms: Storage<ShaderUniform> = new Storage<ShaderUniform>();

	private vertex: Null<WebGLShader> = null;
	private fragment: Null<WebGLShader> = null;

	public vertexSource: string = '';
	public fragmentSource: string = '';

	protected get identifier(): string {
		return 'shaderProgram';
	}

	public constructor() {
		super(() => gl.createProgram(), (handle) => gl.useProgram(handle), (handle) => gl.deleteProgram(handle));
	}

	public apply() {
		gl.linkProgram(this.handle);

		if (gl.getProgramParameter(this.handle, gl.LINK_STATUS) <= 0) {
			const log = gl.getProgramInfoLog(this.handle) as string;

			this.dispose();

			throw new Error(log);
		}

		for (let index = 0; index < gl.getProgramParameter(this.handle, gl.ACTIVE_ATTRIBUTES); index++) {
			const { name } = gl.getActiveAttrib(this.handle, index) as WebGLActiveInfo;

			this.attributes.set(name, index);
		}

		for (let index = 0; index < gl.getProgramParameter(this.handle, gl.ACTIVE_UNIFORMS); index++) {
			const { name } = gl.getActiveUniform(this.handle, index) as WebGLActiveInfo;

			this.uniforms.set(name, gl.getUniformLocation(this.handle, name));
		}
	}

	public attach(type: GLenum, sources: string[]) {
		const shader: WebGLShader = gl.createShader(type) as WebGLShader;
		const source = sources.join('\n');

		switch (type) {
			case gl.VERTEX_SHADER:
				this.vertex = shader;
				this.vertexSource = source;
				break;

			case gl.FRAGMENT_SHADER:
				this.fragment = shader;
				this.fragmentSource = source;
				break;

			default:
				throw new Error();
		}

		gl.shaderSource(shader, source);

		gl.compileShader(shader);

		if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) <= 0) {
			const log = gl.getShaderInfoLog(shader) as string;

			this.dispose();

			throw new SyntaxError(log);
		}

		gl.attachShader(this.handle, shader);
	}

	public dispose(): void {
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