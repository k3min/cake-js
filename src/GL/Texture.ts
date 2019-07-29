import { Indexable, Null } from '../Core/Helpers';
import Context from './Context';
import { BindableGraphicsObject, pixelFormat, PixelFormat, pixelType, PixelType } from './Helpers';
import TextureFilterMode from './Helpers/TextureFilterMode';
import TextureWrapMode from './Helpers/TextureWrapMode';

export enum TextureFormat {
	Alpha8,
	RGB24,
	RGBA32,
	R5G6B5,
	R5G5B5A1,
	RGBA16,
	RGBAFloat,
	RGBAHalf,
	Depth,
	Depth16,
	Depth32,
	Stencil,
	DepthStencil
}

export interface Mipmap {
	data: Null<ArrayBufferView>;
	width: number;
	height: number;
}

export type CubeMapFace = Mipmap[];

export enum TextureTarget {
	Texture2D = 0x0DE1, // GL_TEXTURE_2D
	CubeMap = 0x8513, // GL_TEXTURE_CUBE_MAP
	RenderBuffer = 0x8D41, // GL_RENDERBUFFER
}

type TextureData = TexImageSource | ArrayBufferView | Mipmap[] | CubeMapFace[];

/**
 * @todo Implement observable pattern
 */
abstract class Texture<T extends WebGLObject = WebGLObject> extends BindableGraphicsObject<Texture<T>, T> {
	public name: string = 'Texture';

	public readonly target: TextureTarget;
	private readonly parameters: Indexable<GLenum> = {};

	protected data: Null<TextureData> = null;

	public readonly format: TextureFormat;

	public filterMode: TextureFilterMode = TextureFilterMode.Bilinear;
	public wrapMode: TextureWrapMode = TextureWrapMode.Clamp;

	protected readonly pixelFormat: PixelFormat;
	protected readonly pixelType: PixelType;

	public mipmapCount: number = 0;

	public width: number;
	public height: number;

	protected get identifier(): string {
		return 'Texture';
	}

	protected constructor(width: number, height: number, format: TextureFormat, target: TextureTarget, genFn: () => Null<T>, bindFn: (handle: Null<T>) => void, releaseFn: (handle: T) => void) {
		super(genFn, bindFn, releaseFn);

		this.width = width;
		this.height = height;
		this.format = format;
		this.target = target;

		this.pixelFormat = pixelFormat(format);
		this.pixelType = pixelType(format);
	}

	public set(name: GLenum, value: GLenum): void {
		if (this.parameters[name] === value) {
			return;
		}

		this.parameters[name] = value;

		Context.texParameteri(this.target, name, value);
	}

	private setWrapMode(): void {
		switch (this.wrapMode) {
			case TextureWrapMode.Clamp:
				this.set(Context.TEXTURE_WRAP_S, Context.CLAMP_TO_EDGE);
				this.set(Context.TEXTURE_WRAP_T, Context.CLAMP_TO_EDGE);
				break;

			case TextureWrapMode.Repeat:
				this.set(Context.TEXTURE_WRAP_S, Context.REPEAT);
				this.set(Context.TEXTURE_WRAP_T, Context.REPEAT);
				break;

			case TextureWrapMode.Mirror:
				this.set(Context.TEXTURE_WRAP_S, Context.MIRRORED_REPEAT);
				this.set(Context.TEXTURE_WRAP_T, Context.MIRRORED_REPEAT);
				break;
		}
	}

	private setFilterMode(): void {
		switch (this.filterMode) {
			case TextureFilterMode.Point:
				this.set(Context.TEXTURE_MAG_FILTER, Context.NEAREST);
				this.set(Context.TEXTURE_MIN_FILTER, this.mipmapCount ? Context.NEAREST_MIPMAP_NEAREST : Context.NEAREST);
				break;

			case TextureFilterMode.Bilinear:
				this.set(Context.TEXTURE_MAG_FILTER, Context.LINEAR);
				this.set(Context.TEXTURE_MIN_FILTER, this.mipmapCount ? Context.LINEAR_MIPMAP_NEAREST : Context.LINEAR);
				break;

			case TextureFilterMode.Trilinear:
				this.set(Context.TEXTURE_MAG_FILTER, Context.LINEAR);
				this.set(Context.TEXTURE_MIN_FILTER, Context.LINEAR_MIPMAP_LINEAR);
				break;
		}
	}

	public apply(): void {
		this.bind();

		this.setWrapMode();
		this.setFilterMode();
	}
}

export default Texture;