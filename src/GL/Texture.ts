import Null from '../Helpers/Null';
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

export interface Mipmap {
	data: ArrayBufferView;
	width: number;
	height: number;
}

abstract class Texture<GL extends WebGLObject = WebGLObject> extends BindableGraphicsObject<Texture<GL>, GL> {
	public name: string = 'Texture';

	public readonly target: GLenum;

	protected data: TexImageSource | ArrayBufferView | Mipmap[] | Mipmap[][] | null = null;

	protected readonly pixelInternalFormat: GLenum;
	protected readonly pixelFormat: GLenum;
	protected readonly pixelType: GLenum;

	public readonly format: TextureFormat;

	public width: number;
	public height: number;

	public static get bound(): Null<Texture> {
		return BindableGraphicsObject.map.get('texture') as Null<Texture>;
	}

	protected get identifier(): string {
		return 'texture';
	}

	protected constructor(width: number, height: number, format: TextureFormat, target: GLenum, genFn: () => GL | null, bindFn: (target: GLenum, handle: Null<GL>) => void, releaseFn: (handle: GL) => void) {
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

	public static getPixelFormat(format: TextureFormat): GLenum {
		switch (format) {
			case TextureFormat.Alpha8:
				return gl.ALPHA;

			case TextureFormat.RGBA32:
			case TextureFormat.RGBA4444:
			case TextureFormat.RGBAFloat:
				return gl.RGBA;

			case TextureFormat.RGB24:
			case TextureFormat.RGB565:
				return gl.RGB;

			default:
				throw new RangeError();
		}
	}

	public static getPixelInternalFormat(format: TextureFormat): GLenum {
		switch (format) {
			case TextureFormat.Alpha8:
				return gl.ALPHA;

			case TextureFormat.RGBA4444:
			case TextureFormat.RGBA32:
			case TextureFormat.RGBAFloat:
				return gl.RGBA;

			case TextureFormat.RGB565:
			case TextureFormat.RGB24:
				return gl.RGB;

			default:
				throw new RangeError();
		}
	}

	public static getPixelType(format: TextureFormat): GLenum {
		switch (format) {
			case TextureFormat.Alpha8:
			case TextureFormat.RGBA32:
			case TextureFormat.RGB24:
				return gl.UNSIGNED_BYTE;

			case TextureFormat.RGBA4444:
				return gl.UNSIGNED_SHORT_4_4_4_4;

			case TextureFormat.RGB565:
				return gl.UNSIGNED_SHORT_5_6_5;

			case TextureFormat.RGBAFloat:
				return gl.FLOAT;

			default:
				throw new RangeError();
		}
	}
}

export default Texture;