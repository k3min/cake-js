import { Log } from '../Core';
import { Null, Storage } from '../Core/Helpers';
import { BindableGraphicsObject } from './Helpers';
import Context from './Context';

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

	public readonly id: string;
	public readonly keywords: string[];

	protected get identifier(): string {
		return 'ShaderProgram';
	}

	public constructor(keywords: string[]) {
		super(() => Context.createProgram(), (handle) => Context.useProgram(handle), (handle) => Context.deleteProgram(handle));

		this.keywords = keywords;
		this.id = keywords.sort().toString() || 'default';
	}

	public apply() {
		Context.linkProgram(this.handle);

		if (Context.getProgramParameter(this.handle, Context.LINK_STATUS) <= 0) {
			const log = Context.getProgramInfoLog(this.handle) as string;

			this.dispose();

			throw new Error(log);
		}

		for (let index = 0; index < Context.getProgramParameter(this.handle, Context.ACTIVE_ATTRIBUTES); index++) {
			const info: WebGLActiveInfo = Context.getActiveAttrib(this.handle, index) as WebGLActiveInfo;

			this.attributes.set(info.name, index);
		}

		for (let index = 0; index < Context.getProgramParameter(this.handle, Context.ACTIVE_UNIFORMS); index++) {
			const info: WebGLActiveInfo = Context.getActiveUniform(this.handle, index) as WebGLActiveInfo;

			this.uniforms.set(info.name, Context.getUniformLocation(this.handle, info.name) as WebGLUniformLocation);
		}
	}

	public attach(type: ShaderType, sources: string[]): boolean {
		const shader: WebGLShader = Context.createShader(type) as WebGLShader;
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
		}

		Context.shaderSource(shader, source);

		Context.compileShader(shader);

		if (Context.getShaderParameter(shader, Context.COMPILE_STATUS) <= 0) {
			const log = Context.getShaderInfoLog(shader) as string;

			this.dispose();

			this.logCompileStatus(log, source);

			return false;
		}

		Context.attachShader(this.handle, shader);

		return true;
	}

	private logCompileStatus(log: string, source: string): void {
		console.error(log);

		const logs: string[] = log.split('\n');
		const sources: string[] = source.split('\n');

		const errors: string[] = logs.map((line: string): string => {
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

		const error: string = errors.filter((error: string): boolean => !!error).join('\n');

		Log.error(`ShaderProgram (${ this.name }): SyntaxError\n${ error }\n`);
	}

	protected disposing(): void {
		if (this.vertex !== null) {
			Context.deleteShader(this.vertex);
			this.vertex = null;
		}

		if (this.fragment !== null) {
			Context.deleteShader(this.fragment);
			this.fragment = null;
		}

		super.disposing();
	}
}

export default ShaderProgram;