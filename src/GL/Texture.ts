import Indexable from '../Helpers/Indexable';
import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import GL from './GL';

export enum TextureFormat {
	Alpha8,
	RGB24,
	RGBA32,
	R5G6B5,
	RGBA16,
	RGBAFloat,
}

export enum PixelFormat {
	Alpha = 6406, // GL_ALPHA
	RGB,
	RGBA
}

export enum PixelType {
	Uint8 = 5121, // GL_UNSIGNED_BYTE
	Float32 = 5126, // GL_FLOAT
	Uint16 = 32819, // GL_UNSIGNED_SHORT_4_4_4_4
	Uint565 = 33635, // GL_UNSIGNED_SHORT_5_6_5
}

export interface Mipmap {
	data: ArrayBufferView;
	width: number;
	height: number;
}

export enum TextureTarget {
	Texture2D = 3553, // GL_TEXTURE_2D
	CubeMap = 34067, // GL_TEXTURE_CUBE_MAP
	RenderBuffer = 36161, // GL_RENDERBUFFER
}

abstract class Texture<T extends WebGLObject = WebGLObject> extends BindableGraphicsObject<Texture<T>, T> {
	public name: string = 'Texture';

	public readonly target: TextureTarget;
	private readonly parameters: Indexable<GLenum> = {};

	protected data: TexImageSource | ArrayBufferView | Mipmap[] | Mipmap[][] | null = null;

	protected readonly pixelFormat: PixelFormat;
	protected readonly pixelType: PixelType;

	public readonly format: TextureFormat;

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

		this.pixelFormat = Texture.getPixelFormat(this.format);
		this.pixelType = Texture.getPixelType(this.format);
	}

	public set(name: GLenum, value: GLenum): void {
		if (this.parameters[name] === value) {
			return;
		}

		this.parameters[name] = value;

		GL.texParameteri(this.target, name, value);
	}

	public abstract apply(): void;

	public static getPixelFormat(format: TextureFormat): PixelFormat {
		switch (format) {
			case TextureFormat.Alpha8:
				return PixelFormat.Alpha;

			case TextureFormat.RGBA32:
			case TextureFormat.RGBA16:
			case TextureFormat.RGBAFloat:
				return PixelFormat.RGBA;

			case TextureFormat.RGB24:
			case TextureFormat.R5G6B5:
				return PixelFormat.RGB;

			default:
				throw new RangeError();
		}
	}

	public static getPixelType(format: TextureFormat): PixelType {
		switch (format) {
			case TextureFormat.Alpha8:
			case TextureFormat.RGBA32:
			case TextureFormat.RGB24:
				return PixelType.Uint8;

			case TextureFormat.RGBA16:
				return PixelType.Uint16;

			case TextureFormat.R5G6B5:
				return PixelType.Uint565;

			case TextureFormat.RGBAFloat:
				return PixelType.Float32;

			default:
				throw new RangeError();
		}
	}
}

export default Texture;