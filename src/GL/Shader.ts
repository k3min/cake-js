import { Disposable, Path } from '../Core';
import { Indexable, BindableObject, Null, Storage } from '../Core/Helpers';
import Exception from '../Core/Exception';
import { Matrix4x4, Vector, Vector2, Vector3, Vector4 } from '../Math';
import { ShaderCapabilityValue, ShaderParser, Blend, ColorMask, ShaderCapability, StencilTest } from '../Parsers';
import GL from './GL';
import { CompareFunction } from './Helpers';
import Capability from './Helpers/Capability';
import CullingMode from './Helpers/CullingMode';
import ShaderProgram, { ShaderType } from './ShaderProgram';
import Texture from './Texture';
import Texture2D from './Texture2D';

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

		try {
			await shader.parser.load(url);
		} catch (e) {
			throw new Exception(`Shader: failed to load '${ url }'`, e);
		}

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

	private logUniformNotFound(name: string, type: string): void {
		const id: string = `${ name } (${ type })`;
		const log: string = `Shader (${ this.name }): uniform ${ id } not found`;

		if (id in this.log) {
			return;
		}

		console.warn(log);

		this.log[id] = log;
	}

	private getUniform(name: string, type: string, check: boolean = true): Null<WebGLUniformLocation> {
		this.bind();

		const uniform: WebGLUniformLocation = this.uniforms.get(name) as WebGLUniformLocation;

		if (uniform) {
			return uniform;
		}

		if (check && !name.startsWith('cake')) {
			this.logUniformNotFound(name, type);
		}

		return null;
	}

	public setFloat(name: string, value: GLfloat, check: boolean = true): void {
		const uniform: WebGLUniformLocation = this.getUniform(name, 'float', check) as WebGLUniformLocation;

		if (!uniform) {
			return;
		}

		GL.uniform1f(uniform, value);
	}

	public setInt(name: string, value: GLint, check: boolean = true): void {
		const uniform: WebGLUniformLocation = this.getUniform(name, 'int', check) as WebGLUniformLocation;

		if (!uniform) {
			return;
		}

		GL.uniform1i(uniform, value);
	}

	public setMatrix4x4(name: string, value: Matrix4x4, check: boolean = true): void {
		const uniform: WebGLUniformLocation = this.getUniform(name, 'Matrix4x4', check) as WebGLUniformLocation;

		if (!uniform) {
			return;
		}

		GL.uniformMatrix4fv(uniform, false, value);
	}

	public setVector(name: string, value: Vector, check: boolean = true): void {
		const uniform: WebGLUniformLocation = this.getUniform(name, `Vector${ value.length }`, check) as WebGLUniformLocation;

		if (!uniform) {
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

	public setTexture(name: string, texture: Texture, check: boolean = true): void {
		const uniform: WebGLUniformLocation = this.getUniform(name, 'texture', check) as WebGLUniformLocation;

		if (!uniform) {
			return;
		}

		if (texture instanceof Texture2D) {
			const uniform2: WebGLUniformLocation = this.getUniform(`${ name }_TexelSize`, 'Vector4', false) as WebGLUniformLocation;

			if (uniform2) {
				GL.uniform4fv(uniform2, texture.texelSize);
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

	private setCap(cap: ShaderCapability): void {
		const value: ShaderCapabilityValue = this.parser.capabilities[cap];

		switch (cap) {
			case ShaderCapability.StencilTest: {
				if (value) {
					const { func, ref, mask }: StencilTest = value as StencilTest;
					GL.enable(Capability.StencilTest);
					GL.stencilFunc(func, ref, mask);
				} else {
					GL.disable(Capability.StencilTest);
				}

				break;
			}

			case ShaderCapability.DepthTest: {
				const func: CompareFunction = value as CompareFunction;
				GL.enable(Capability.DepthTest);
				GL.depthFunc(func);
				break;
			}

			case ShaderCapability.Blend: {
				if (value) {
					const { src, dst }: Blend = value as Blend;
					GL.enable(Capability.Blend);
					GL.blendFunc(src, dst);
				} else {
					GL.disable(Capability.Blend);
				}
				break;
			}

			case ShaderCapability.CullFace: {
				if (value) {
					const mode: CullingMode = value as CullingMode;
					GL.enable(Capability.CullFace);
					GL.cullFace(mode);
				} else {
					GL.disable(Capability.CullFace);
				}
				break;
			}

			case ShaderCapability.DepthMask: {
				GL.depthMask(!!value);
				break;
			}

			case ShaderCapability.ColorMask: {
				const { r, g, b, a }: ColorMask = value as ColorMask;
				GL.colorMask(r, g, b, a);
				break;
			}

			default:
				throw new RangeError(`Shader (${ this.name }): unknown cap '${ cap }'`);
		}
	}

	protected unbinding(): void {
		this.variant.unbind();
	}

	protected binding(): void {
		for (let cap of Object.values(ShaderCapability)) {
			this.setCap(cap);
		}

		this.variant.bind();

		Shader.floats.forEach((value, name) => this.setFloat(name, value, false));
		Shader.ints.forEach((value, name) => this.setInt(name, value, false));
		Shader.vectors.forEach((value, name) => this.setVector(name, value, false));
		Shader.matrices.forEach((value, name) => this.setMatrix4x4(name, value, false));
		Shader.textures.forEach((value, name) => this.setTexture(name, value, false));
	}

	protected disposing(): void {
		this.variants.forEach((variant: ShaderProgram) => variant.dispose());
		this.variants.clear();
	}
}

export default Shader;