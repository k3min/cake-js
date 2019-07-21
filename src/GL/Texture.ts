import BindableObject from '../Helpers/BindableObject';
import Null from '../Helpers/Null';
import { FramebufferTarget } from './Framebuffer';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import gl from './index';

export enum TextureFormat {
	Alpha8,
	RGB24,
	RGBA32,
	RGB565,
	RGBA4444,
	RGBAFloat,
}

export enum TextureWrap {
	Repeat = gl.REPEAT,
	Clamp = gl.CLAMP_TO_EDGE,
}

export enum TextureFilter {
	Nearest = gl.NEAREST,
	Linear = gl.LINEAR,
	NearestNearest = gl.NEAREST_MIPMAP_NEAREST,
	LinearNearest = gl.LINEAR_MIPMAP_NEAREST,
	NearestLinear = gl.NEAREST_MIPMAP_LINEAR,
	LinearLinear = gl.LINEAR_MIPMAP_LINEAR,
}

export enum PixelFormat {
	Alpha = gl.ALPHA,
	DepthComponent = gl.DEPTH_COMPONENT,
	DepthStencil = gl.DEPTH_STENCIL,
	Luminance = gl.LUMINANCE,
	LuminanceAlpha = gl.LUMINANCE_ALPHA,
	Rgb = gl.RGB,
	Rgba = gl.RGBA,
}

export enum PixelInternalFormat {
	Alpha = gl.ALPHA,
	Luminance = gl.LUMINANCE,
	LuminanceAlpha = gl.LUMINANCE_ALPHA,
	Rgb = gl.RGB,
	Rgba = gl.RGBA,
}

export enum PixelType {
	Byte = gl.BYTE,
	Float = gl.FLOAT,
	Int = gl.INT,
	Short = gl.SHORT,
	UnsignedByte = gl.UNSIGNED_BYTE,
	UnsignedInt = gl.UNSIGNED_INT,
	UnsignedShort = gl.UNSIGNED_SHORT,
	UnsignedShort4444 = gl.UNSIGNED_SHORT_4_4_4_4,
	UnsignedShort5551 = gl.UNSIGNED_SHORT_5_5_5_1,
	UnsignedShort565 = gl.UNSIGNED_SHORT_5_6_5,
}

export interface TextureFiltering {
	min: TextureFilter;
	mag: TextureFilter;
}

export interface TextureWrapping {
	s: TextureWrap;
	t: TextureWrap;
}

export interface Mipmap {
	data: ArrayBufferView;
	width: number;
	height: number;
}

abstract class Texture<GL extends WebGLObject = WebGLObject> extends BindableGraphicsObject<Texture<GL>, GL> {
	public readonly target: FramebufferTarget;

	protected data: TexImageSource | ArrayBufferView | Mipmap[] | Mipmap[][] | null = null;

	protected readonly pixelInternalFormat: PixelInternalFormat;
	protected readonly pixelFormat: PixelFormat;
	protected readonly pixelType: PixelType;

	public readonly format: TextureFormat;

	public width: number;
	public height: number;

	public static get bound(): Null<Texture> {
		return BindableObject.map.get('texture') as Null<Texture>;
	}

	protected get identifier(): string {
		return 'texture';
	}

	protected constructor(width: number, height: number, format: TextureFormat, target: FramebufferTarget, genFn: () => GL | null, bindFn: (target: FramebufferTarget, handle: Null<GL>) => void, releaseFn: (handle: GL) => void) {
		super(genFn, (handle) => bindFn(target, handle), releaseFn);

		this.width = width;
		this.height = height;
		this.format = format;
		this.target = target;

		this.pixelInternalFormat = Texture.getPixelInternalFormat(this.format);
		this.pixelFormat = Texture.getPixelFormat(this.format);
		this.pixelType = Texture.getPixelType(this.format);
	}

	public abstract apply(): void;

	public static getPixelFormat(format: TextureFormat): PixelFormat {
		switch (format) {
			case TextureFormat.Alpha8:
				return PixelFormat.Alpha;

			case TextureFormat.RGBA32:
			case TextureFormat.RGBA4444:
			case TextureFormat.RGBAFloat:
				return PixelFormat.Rgba;

			case TextureFormat.RGB24:
			case TextureFormat.RGB565:
				return PixelFormat.Rgb;

			default:
				throw new Error();
		}
	}

	public static getPixelInternalFormat(format: TextureFormat): PixelInternalFormat {
		switch (format) {
			case TextureFormat.Alpha8:
				return PixelInternalFormat.Alpha;

			case TextureFormat.RGBA4444:
			case TextureFormat.RGBA32:
			case TextureFormat.RGBAFloat:
				return PixelInternalFormat.Rgba;

			case TextureFormat.RGB565:
			case TextureFormat.RGB24:
				return PixelInternalFormat.Rgb;

			default:
				throw new Error();
		}
	}

	public static getPixelType(format: TextureFormat): PixelType {
		switch (format) {
			case TextureFormat.Alpha8:
			case TextureFormat.RGBA32:
			case TextureFormat.RGB24:
				return PixelType.UnsignedByte;

			case TextureFormat.RGBA4444:
				return PixelType.UnsignedShort4444;

			case TextureFormat.RGB565:
				return PixelType.UnsignedShort565;

			case TextureFormat.RGBAFloat:
				return PixelType.Float;

			default:
				throw new Error();
		}
	}
}

export default Texture;