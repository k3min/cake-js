import Disposable from './Helpers/Disposable';
import gl from './GL';
import ShaderProgram, { ShaderAttribute, ShaderType, ShaderUniform } from './GL/ShaderProgram';
import Texture from './GL/Texture';
import Texture2D from './GL/Texture2D';
import BindableObject from './Helpers/BindableObject';
import Null from './Helpers/Null';
import Path from './Helpers/Path';
import ShaderParser from './Helpers/ShaderParser';
import Storage from './Helpers/Storage';
import { Matrix4x4, Vector, Vector2, Vector3, Vector4 } from './Math';

class Shader extends BindableObject<Shader> implements Disposable {
	private variants: Storage<ShaderProgram> = new Storage<ShaderProgram>();

	private readonly parser: ShaderParser = new ShaderParser();

	private textureIndices: string[] = [];
	private textureIndex: number = 0;

	// @ts-ignore
	private variant: ShaderProgram;

	public name: string = 'Shader';

	public static floats: Storage<GLfloat> = new Storage<GLfloat>();
	public static ints: Storage<GLint> = new Storage<GLint>();
	public static vectors: Storage<Vector> = new Storage<Vector>();
	public static matrices: Storage<Matrix4x4> = new Storage<Matrix4x4>();
	public static textures: Storage<Texture> = new Storage<Texture>();

	public get attributes(): Storage<ShaderAttribute> {
		return this.variant.attributes;
	}

	public get uniforms(): Storage<ShaderUniform> {
		return this.variant.uniforms;
	}

	public set keywords(value: Null<string[]>) {
		let id = '';

		if (value && value.length > 0) {
			id = value.sort().join('');
		}

		const variant: ShaderProgram = this.variants.get(id) as ShaderProgram;

		if (!variant) {
			throw new ReferenceError(`Shader (${ this.name }): variant ${ id } not found`);
		}

		this.variant = variant;
	}

	protected get identifier(): string {
		return 'shader';
	}

	public static get bound(): Null<Shader> {
		return BindableObject.map.get('shader') as Null<Shader>;
	}

	public static async load(url: string): Promise<Shader> {
		const shader: Shader = new Shader();

		shader.name = Path.getFileName(url);

		await shader.parser.parse(await ShaderParser.load(url));

		shader.apply();

		return shader;
	}

	public apply(): void {
		this.parser.keywords.forEach((keywords: string[]) => {
			const defines: string[] = [];

			keywords.forEach((keyword: string) => defines.push(`#define ${ keyword }`));

			const attachment: ShaderProgram = new ShaderProgram();

			attachment.attach(ShaderType.Vertex, defines.concat(this.parser.vertexSource));
			attachment.attach(ShaderType.Fragment, defines.concat(this.parser.fragmentSource));

			attachment.apply();

			this.variants.set(keywords.join(''), attachment);
		});

		this.keywords = null;
	}

	public setFloat(name: string, value: GLfloat): void {
		this.bind();

		const uniform: Null<ShaderUniform> = this.uniforms.get(name) as Null<ShaderUniform>;

		if (!uniform) {
			if (!name.startsWith('cake')) {
				this.uniformNotFound('float', name);
			}

			return;
		}

		gl.uniform1f(uniform, value);
	}

	public setInt(name: string, value: GLint): void {
		this.bind();

		const uniform: Null<ShaderUniform> = this.uniforms.get(name) as Null<ShaderUniform>;

		if (!uniform) {
			if (!name.startsWith('cake')) {
				this.uniformNotFound('int', name);
			}

			return;
		}

		gl.uniform1i(uniform, value);
	}

	public setMatrix4x4(name: string, value: Matrix4x4): void {
		this.bind();

		const uniform: Null<ShaderUniform> = this.uniforms.get(name) as Null<ShaderUniform>;

		if (!uniform) {
			if (!name.startsWith('cake')) {
				this.uniformNotFound('Matrix4x4', name);
			}

			return;
		}

		gl.uniformMatrix4fv(uniform, false, value._);
	}

	public setVector(name: string, value: Vector): void {
		this.bind();

		const uniform: Null<ShaderUniform> = this.uniforms.get(name) as Null<ShaderUniform>;

		if (!uniform) {
			if (!name.startsWith('cake')) {
				this.uniformNotFound(`Vector${ value.length }`, name);
			}
			return;
		}

		switch (value.length) {
			case Vector2.LENGTH:
				gl.uniform2fv(uniform, value);
				break;

			case Vector3.LENGTH:
				gl.uniform3fv(uniform, value);
				break;

			case Vector4.LENGTH:
				gl.uniform4fv(uniform, value);
				break;
		}
	}

	public setTexture(name: string, texture: Texture): void {
		this.bind();

		const uniform: Null<ShaderUniform> = this.uniforms.get(name) as Null<ShaderUniform>;

		if (!uniform) {
			if (!name.startsWith('cake')) {
				this.uniformNotFound('Texture', name);
			}

			return;
		}

		if (texture as Texture2D) {
			const uniform2: Null<ShaderUniform> = this.uniforms.get(`${ name }_TexelSize`) as Null<ShaderUniform>;

			if (uniform2) {
				gl.uniform4fv(uniform2, (texture as Texture2D).texelSize);
			}
		}

		let index: number = this.textureIndices.indexOf(name);

		if (index === -1) {
			index = this.textureIndex++;
			this.textureIndices[index] = name;
		}

		gl.activeTexture(gl.TEXTURE0 + index);

		texture.bind();

		gl.uniform1i(uniform, index);
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

	public afterBind(): void {
		this.variant.bind();

		Shader.floats.forEach((value, name) => this.setFloat(name, value));
		Shader.ints.forEach((value, name) => this.setInt(name, value));
		Shader.vectors.forEach((value, name) => this.setVector(name, value));
		Shader.matrices.forEach((value, name) => this.setMatrix4x4(name, value));
		Shader.textures.forEach((value, name) => this.setTexture(name, value));
	}

	public dispose(): void {
		super.dispose();

		this.variants.forEach((variant: ShaderProgram) => variant.dispose());
		this.variants.clear();
	}

	private uniformNotFound(type: string, name: string): void {
		console.warn(`Shader (${ this.name }): uniform (${ type }) ${ name } not found!`);
	}
}

export default Shader;