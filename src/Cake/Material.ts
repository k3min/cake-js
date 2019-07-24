import { Texture, Shader } from '../GL';
import { Matrix4x4, Vector } from '../Math';
import { Base, Storage, Toggle } from '../Helpers';

class Material extends Base {
	public name: string = 'Material';

	private readonly ints: Storage<GLint> = new Storage<GLint>();
	private readonly floats: Storage<GLfloat> = new Storage<GLfloat>();
	private readonly vectors: Storage<Vector> = new Storage<Vector>();
	private readonly matrices: Storage<Matrix4x4> = new Storage<Matrix4x4>();
	private readonly textures: Storage<Texture> = new Storage<Texture>();

	private readonly keywords: Toggle = new Toggle();

	public readonly shader: Shader;

	public constructor(shader: Shader) {
		super();

		this.shader = shader;
		this.name = shader.name;
	}

	public use(): void {
		this.shader.keywords = this.keywords.toArray();

		this.shader.bind();

		this.floats.forEach((value, name) => this.shader.setFloat(name, value));
		this.ints.forEach((value, name) => this.shader.setInt(name, value));
		this.vectors.forEach((value, name) => this.shader.setVector(name, value));
		this.textures.forEach((value, name) => this.shader.setTexture(name, value));
		this.matrices.forEach((value, name) => this.shader.setMatrix4x4(name, value));
	}

	public setKeyword(name: string, value: boolean): void {
		this.keywords.set(name, value);
	}

	public setTexture(name: string, value: Texture): void {
		this.textures.set(name, value);
	}

	public setVector(name: string, value: Vector): void {
		this.vectors.set(name, value);
	}

	public setMatrix4x4(name: string, value: Matrix4x4): void {
		this.matrices.set(name, value);
	}

	public setInt(name: string, value: GLint): void {
		this.ints.set(name, value);
	}

	public setFloat(name: string, value: GLfloat): void {
		this.floats.set(name, value);
	}

	protected disposing(): void {
		//
	}
}

export default Material;