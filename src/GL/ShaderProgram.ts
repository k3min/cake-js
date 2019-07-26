import { Null, Storage } from '../Core/Helpers';
import { BindableGraphicsObject } from './Helpers';
import GL from './GL';

const ERROR_PATTERN: RegExp = /ERROR: \d+:(\d+): '(\w+)' : (.*)/;
const STACK_PATTERN: RegExp = /^\/\*\* (.*) \*\//;

export enum ShaderType {
	Fragment = 0x8B30, // GL_FRAGMENT_SHADER
	Vertex = 0x8B31, // GL_VERTEX_SHADER
}

class ShaderProgram extends BindableGraphicsObject<ShaderProgram, WebGLProgram> {
	public name: string = 'ShaderProgram';

	public readonly attributes: Storage<number> = new Storage<number>();
	public readonly uniforms: Storage<WebGLUniformLocation> = new Storage<WebGLUniformLocation>();

	private vertex: Null<WebGLShader> = null;
	private fragment: Null<WebGLShader> = null;

	public vertexSource: string = '';
	public fragmentSource: string = '';

	protected get identifier(): string {
		return 'ShaderProgram';
	}

	public constructor() {
		super(() => GL.createProgram(), (handle) => GL.useProgram(handle), (handle) => GL.deleteProgram(handle));
	}

	public apply() {
		GL.linkProgram(this.handle);

		if (GL.getProgramParameter(this.handle, GL.LINK_STATUS) <= 0) {
			const log = GL.getProgramInfoLog(this.handle) as string;

			this.dispose();

			throw new Error(log);
		}

		for (let index = 0; index < GL.getProgramParameter(this.handle, GL.ACTIVE_ATTRIBUTES); index++) {
			const info: WebGLActiveInfo = GL.getActiveAttrib(this.handle, index) as WebGLActiveInfo;

			this.attributes.set(info.name, index);
		}

		for (let index = 0; index < GL.getProgramParameter(this.handle, GL.ACTIVE_UNIFORMS); index++) {
			const info: WebGLActiveInfo = GL.getActiveUniform(this.handle, index) as WebGLActiveInfo;

			this.uniforms.set(info.name, GL.getUniformLocation(this.handle, info.name) as WebGLUniformLocation);
		}
	}

	public attach(type: ShaderType, sources: string[]): boolean {
		const shader: WebGLShader = GL.createShader(type) as WebGLShader;
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

		const log = GL.getShaderInfoLog(shader) as string;

		this.dispose();

		let errors: string[] = log.split('\n');

		errors = errors.map((line: string): string => {
			const match: RegExpMatchArray = line.match(ERROR_PATTERN) as RegExpMatchArray;

			if (!match) {
				return '';
			}

			const [, number, fn, error] = match;

			const source: string = sources[(+number) - 1].trim();

			const match2: RegExpMatchArray = source.match(STACK_PATTERN) as RegExpMatchArray;

			if (!match2) {
				return '';
			}

			const [, stack] = match2;

			return `${ error[0].toUpperCase() + error.slice(1) } (${ fn }@${ stack })`;
		});

		errors = errors.filter((error: string): boolean => !!error);

		console.error(`ShaderProgram (${ this.name }): SyntaxError\n${ errors.join('\n') }\n`);

		return false;
	}

	protected disposing(): void {
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