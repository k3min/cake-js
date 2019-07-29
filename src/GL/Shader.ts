import { Exception, Path, Base, Bindable, Log } from '../Core';
import { Null, Storage } from '../Core/Helpers';
import { Color, Matrix4x4, Vector, Vector2, Vector3, Vector4 } from '../Math';

import {
	Blend,
	ColorMask,
	ShaderCapability,
	ShaderCapabilityValue,
	ShaderParser,
	StencilTest,
	StencilOp,
} from '../Parsers';

import Context from './Context';
import { CompareFunction, Capability, CullingMode } from './Helpers';
import ShaderProgram, { ShaderType } from './ShaderProgram';
import Texture from './Texture';
import Texture2D from './Texture2D';

/**
 * @todo Unset uniforms without (valid) value
 * @todo Warn about wrong attribute type
 */
class Shader extends Base implements Bindable {
	public name: string = 'Shader';

	private static _bound: Null<Shader> = null;

	private variants: Storage<ShaderProgram> = new Storage<ShaderProgram>();

	private readonly parser: ShaderParser = new ShaderParser();

	private textureIndices: string[] = [];

	// @ts-ignore
	private _variant: ShaderProgram;

	public static floats: Storage<GLfloat> = new Storage<GLfloat>();
	public static ints: Storage<GLint> = new Storage<GLint>();
	public static vectors: Storage<Vector> = new Storage<Vector>();
	public static matrices: Storage<Matrix4x4> = new Storage<Matrix4x4>();
	public static textures: Storage<Texture> = new Storage<Texture>();
	public static colors: Storage<Color> = new Storage<Color>();

	private readonly log: string[] = [];

	public static get bound(): Null<Shader> {
		return Shader._bound;
	}

	public get attributes(): Storage<number> {
		return this._variant.attributes;
	}

	public get uniforms(): Storage<WebGLUniformLocation> {
		return this._variant.uniforms;
	}

	public get variant(): ShaderProgram {
		return this._variant;
	}

	public get keywords(): Null<string[]> {
		return this._variant.keywords;
	}

	public set keywords(value: Null<string[]>) {
		let id: string = 'default';

		if (value && value.length > 0) {
			id = value.sort().toString();
		}

		const variant: ShaderProgram = this.variants.get(id) as ShaderProgram;

		if (!variant) {
			throw new ReferenceError(`Shader (${ this.name }): variant '${ id }' not found`);
		}

		this._variant = variant;
	}

	public static async load(uri: string): Promise<Shader> {
		const shader: Shader = new Shader();

		shader.name = Path.getFileName(uri);

		try {
			await shader.parser.load(uri);
		} catch (e) {
			throw new Exception(`Shader: failed to load '${ uri }'`, e);
		}

		shader.apply();

		return shader;
	}

	private apply(): void {
		this.parser.keywords.forEach((keywords: string[]) => {
			const defines: string[] = keywords.map((keyword: string): string => `#define ${ keyword }`);
			const id: string = keywords.sort().toString() || 'default';

			const attachment: ShaderProgram = new ShaderProgram(keywords);

			attachment.name = `${ this.name } (${ id })`;

			const es: string[] = [`#define WEBGL2 ${ Context.isWebGL2 ? 1 : 0 }`];

			if (Context.isWebGL2) {
				es.unshift('#version 100');
			}

			if (!attachment.attach(ShaderType.Vertex, [...es, ...defines, ...this.parser.vertexSource])) {
				return;
			}

			if (!attachment.attach(ShaderType.Fragment, [...es, ...defines, ...this.parser.fragmentSource])) {
				return;
			}

			attachment.apply();

			this.variants.set(id, attachment);
		});

		this.keywords = null;
	}

	private logUniformNotFound(name: string, type: string): void {
		const uniform: string = `'${ name }' (${ type })`;
		const variant: string = this._variant.id;

		const log: string = `Shader (${ this.name }): uniform ${ uniform } not found (variant '${ variant }')`;

		if (this.log.includes(log)) {
			return;
		}

		Log.warn(log);

		this.log.push(log);
	}

	private getUniform(name: string, type: string, check: boolean = true): Null<WebGLUniformLocation> {
		this.bind();

		const uniform: WebGLUniformLocation = this._variant.uniforms.get(name) as WebGLUniformLocation;

		if (uniform !== undefined) {
			return uniform;
		}

		if (check && !name.startsWith('cake')) {
			this.logUniformNotFound(name, type);
		}

		return null;
	}

	public setColor(name: string, value: Color, check: boolean = true): void {
		const uniform: WebGLUniformLocation = this.getUniform(name, 'Color', check) as WebGLUniformLocation;

		if (uniform === undefined) {
			return;
		}

		Context.uniform4fv(uniform, value.linear);
	}

	public setFloat(name: string, value: GLfloat, check: boolean = true): void {
		const uniform: WebGLUniformLocation = this.getUniform(name, 'float', check) as WebGLUniformLocation;

		if (uniform === undefined) {
			return;
		}

		Context.uniform1f(uniform, value);
	}

	public setInt(name: string, value: GLint, check: boolean = true): void {
		const uniform: WebGLUniformLocation = this.getUniform(name, 'int', check) as WebGLUniformLocation;

		if (uniform === undefined) {
			return;
		}

		Context.uniform1i(uniform, value);
	}

	public setMatrix4x4(name: string, value: Matrix4x4, check: boolean = true): void {
		const uniform: WebGLUniformLocation = this.getUniform(name, 'Matrix4x4', check) as WebGLUniformLocation;

		if (uniform === undefined) {
			return;
		}

		Context.uniformMatrix4fv(uniform, false, value);
	}

	public setVector(name: string, value: Vector, check: boolean = true): void {
		const uniform: WebGLUniformLocation = this.getUniform(name, `Vector${ value.length }`, check) as WebGLUniformLocation;

		if (uniform === undefined) {
			return;
		}

		switch (value.length) {
			case Vector2.LENGTH:
				Context.uniform2fv(uniform, value);
				break;

			case Vector3.LENGTH:
				Context.uniform3fv(uniform, value);
				break;

			case Vector4.LENGTH:
				Context.uniform4fv(uniform, value);
				break;
		}
	}

	public setTexture(name: string, texture: Texture, check: boolean = true): void {
		if (!texture || texture.disposed) {
			throw new ReferenceError(`Shader (${ this.name }): invalid Texture '${ name }'`);
		}

		const uniform: WebGLUniformLocation = this.getUniform(name, 'Texture', check) as WebGLUniformLocation;

		if (uniform === undefined) {
			return;
		}

		if (texture instanceof Texture2D) {
			const uniform2: WebGLUniformLocation = this.getUniform(`${ name }_TexelSize`, 'Vector4', false) as WebGLUniformLocation;

			if (uniform2 !== undefined) {
				Context.uniform4fv(uniform2, texture.texelSize);
			}
		}

		let index: number = this.textureIndices.indexOf(name);

		if (index === -1) {
			index = this.textureIndices.push(name) - 1;
		}

		Context.activeTexture(Context.TEXTURE0 + index);

		texture.bind();

		Context.uniform1i(uniform, index);
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

	public static setColor(name: string, value: Color): void {
		Shader.colors.set(name, value);
	}

	private setCap(cap: ShaderCapability): void {
		const value: ShaderCapabilityValue = this.parser.capabilities[cap];

		switch (cap) {
			case ShaderCapability.StencilTest: {
				if (value === false) {
					Context.disable(Capability.StencilTest);
				} else {
					const { func, ref, mask }: StencilTest = value as StencilTest;
					Context.enable(Capability.StencilTest);
					Context.stencilFunc(func, ref, mask);
				}

				break;
			}

			case ShaderCapability.StencilOp: {
				const { fail, zFail, zPass }: StencilOp = value as StencilOp;
				Context.stencilOp(fail, zFail, zPass);
				break;
			}

			case ShaderCapability.DepthTest: {
				const func: CompareFunction = value as CompareFunction;
				Context.enable(Capability.DepthTest);
				Context.depthFunc(func);
				break;
			}

			case ShaderCapability.Blend: {
				if (value === false) {
					Context.disable(Capability.Blend);
				} else {
					Context.enable(Capability.Blend);
					const { srcRGB, dstRGB, srcA, dstA }: Blend = value as Blend;
					if (srcA !== false && dstA !== false) {
						Context.blendFuncSeparate(srcRGB, dstRGB, srcA, dstA);
					} else {
						Context.blendFunc(srcRGB, dstRGB);
					}
				}
				break;
			}

			case ShaderCapability.CullFace: {
				if (value === false) {
					Context.disable(Capability.CullFace);
				} else {
					const mode: CullingMode = value as CullingMode;
					Context.enable(Capability.CullFace);
					Context.cullFace(mode);
				}
				break;
			}

			case ShaderCapability.DepthMask: {
				Context.depthMask(value as boolean);
				break;
			}

			case ShaderCapability.ColorMask: {
				const { r, g, b, a }: ColorMask = value as ColorMask;
				Context.colorMask(r, g, b, a);
				break;
			}
		}
	}

	public unbind(): boolean {
		if (!this._variant.unbind()) {
			return false;
		}

		Shader._bound = null;

		return true;
	}

	public bind(): boolean {
		if (!this._variant.bind()) {
			return false;
		}

		Shader._bound = this;

		Object.values(ShaderCapability).forEach((cap) => this.setCap(cap));

		Shader.floats.forEach((value, name) => this.setFloat(name, value));
		Shader.ints.forEach((value, name) => this.setInt(name, value));
		Shader.vectors.forEach((value, name) => this.setVector(name, value));
		Shader.matrices.forEach((value, name) => this.setMatrix4x4(name, value));
		Shader.textures.forEach((value, name) => this.setTexture(name, value));
		Shader.colors.forEach((value, name) => this.setColor(name, value));

		return true;
	}

	protected disposing(): void {
		this.variants.forEach((variant: ShaderProgram): void => variant.dispose());
		this.variants.clear();
	}
}

export default Shader;