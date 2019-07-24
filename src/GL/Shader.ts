import GL from './GL';
import { ShaderParser } from '../Parsers';
import ShaderProgram, { ShaderType } from './ShaderProgram';
import Texture from './Texture';
import Texture2D from './Texture2D';
import { BindableObject, Disposable, Null, Path, Storage, Indexable } from '../Helpers';
import { Matrix4x4, Vector, Vector2, Vector3, Vector4 } from '../Math';

/**
 * @todo Implement blending, culling, etc.
 */

class Shader extends BindableObject<Shader> implements Disposable {
	public name: string = 'Shader';

	private variants: Storage<ShaderProgram> = new Storage<ShaderProgram>();

	private readonly parser: ShaderParser = new ShaderParser();

	private textureIndices: string[] = [];
	private textureIndex: number = 0;

	// @ts-ignore
	private variant: ShaderProgram;

	public static floats: Storage<GLfloat> = new Storage<GLfloat>();
	public static ints: Storage<GLint> = new Storage<GLint>();
	public static vectors: Storage<Vector> = new Storage<Vector>();
	public static matrices: Storage<Matrix4x4> = new Storage<Matrix4x4>();
	public static textures: Storage<Texture> = new Storage<Texture>();

	private readonly log: Indexable<string> = {};

	public get attributes(): Storage<number> {
		return this.variant.attributes;
	}

	public get uniforms(): Storage<WebGLUniformLocation> {
		return this.variant.uniforms;
	}

	public set keywords(value: Null<string[]>) {
		let id = '';

		if (value && value.length > 0) {
			id = value.sort().join('');
		}

		const variant: ShaderProgram = this.variants.get(id) as ShaderProgram;

		if (!variant) {
			throw new ReferenceError(`Shader (${ this.name }): variant '${ id || 'default' }' not found`);
		}

		this.variant = variant;
	}

	protected get identifier(): string {
		return 'Shader';
	}

	public static async load(url: string): Promise<Shader> {
		const shader: Shader = new Shader();

		shader.name = Path.getFileName(url);

		await shader.parser.load(url);

		shader.apply();

		return shader;
	}

	public apply(): void {
		this.parser.keywords.forEach((keywords: string[]) => {
			const defines: string[] = [];

			keywords.forEach((keyword: string) => defines.push(`#define ${ keyword }`));

			const attachment: ShaderProgram = new ShaderProgram();

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

	public setFloat(name: string, value: GLfloat): void {
		this.bind();

		const uniform: WebGLUniformLocation = this.uniforms.get(name) as WebGLUniformLocation;

		if (!uniform) {
			if (!name.startsWith('cake')) {
				this.uniformNotFound('float', name);
			}

			return;
		}

		GL.uniform1f(uniform, value);
	}

	public setInt(name: string, value: GLint): void {
		this.bind();

		const uniform: WebGLUniformLocation = this.uniforms.get(name) as WebGLUniformLocation;

		if (!uniform) {
			if (!name.startsWith('cake')) {
				this.uniformNotFound('int', name);
			}

			return;
		}

		GL.uniform1i(uniform, value);
	}

	public setMatrix4x4(name: string, value: Matrix4x4): void {
		this.bind();

		const uniform: WebGLUniformLocation = this.uniforms.get(name) as WebGLUniformLocation;

		if (!uniform) {
			if (!name.startsWith('cake')) {
				this.uniformNotFound('Matrix4x4', name);
			}

			return;
		}

		GL.uniformMatrix4fv(uniform, false, value);
	}

	public setVector(name: string, value: Vector): void {
		this.bind();

		const uniform: WebGLUniformLocation = this.uniforms.get(name) as WebGLUniformLocation;

		if (!uniform) {
			if (!name.startsWith('cake')) {
				this.uniformNotFound(`Vector${ value.length }`, name);
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

	public setTexture(name: string, texture: Texture): void {
		this.bind();

		const uniform: WebGLUniformLocation = this.uniforms.get(name) as WebGLUniformLocation;

		if (!uniform) {
			if (!name.startsWith('cake')) {
				this.uniformNotFound('Texture', name);
			}

			return;
		}

		if (texture instanceof Texture2D) {
			const name2 = `${ name }_TexelSize`;
			const value2: Vector4 = texture.texelSize;

			const uniform2: WebGLUniformLocation = this.uniforms.get(name2) as WebGLUniformLocation;

			if (uniform2) {
				GL.uniform4fv(uniform2, value2);
			}
		}

		let index: number = this.textureIndices.indexOf(name);

		if (index === -1) {
			index = this.textureIndex++;
			this.textureIndices[index] = name;
		}

		GL.activeTexture(GL.TEXTURE0 + index);

		texture.bind();

		GL.uniform1i(uniform, index);
	}

	public static setFloat(name: string, value: number): void {
		Shader.floats.set(name, value);
	}

	public static setInt(name: string, value: number): void {
		Shader.ints.set(name, value);
	}

	public static setVector(name: string, value: Vector): void {
		Shader.vectors.set(name, value);
	}

	public static setMatrix4x4(name: string, value: Matrix4x4): void {
		Shader.matrices.set(name, value);
	}

	public static setTexture(name: string, value: Texture): void {
		Shader.textures.set(name, value);
	}

	protected onUnbind(): void {
		this.variant.unbind();
	}

	protected onBind(): void {
		this.variant.bind();

		Shader.floats.forEach((value, name) => this.setFloat(name, value));
		Shader.ints.forEach((value, name) => this.setInt(name, value));
		Shader.vectors.forEach((value, name) => this.setVector(name, value));
		Shader.matrices.forEach((value, name) => this.setMatrix4x4(name, value));
		Shader.textures.forEach((value, name) => this.setTexture(name, value));
	}

	protected disposing(): void {
		this.variants.forEach((variant: ShaderProgram) => variant.dispose());
		this.variants.clear();
	}

	private uniformNotFound(type: string, name: string): void {
		const log: string = `Shader (${ this.name }): uniform (${ type }) ${ name } not found!`;

		if (this.log[log]) {
			return;
		}

		console.warn(log);

		this.log[log] = log;
	}
}

export default Shader;