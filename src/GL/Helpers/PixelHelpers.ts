import { TextureFormat } from '../Texture';

export enum PixelFormat {
	Depth = 0x1902, // GL_DEPTH_COMPONENT
	Alpha = 0x1906, // GL_ALPHA
	RGB = 0x1907, // GL_RGB
	RGBA = 0x1908, // GL_RGBA
	DepthStencil = 0x84F9, // GL_DEPTH_STENCIL
}

export enum PixelType {
	Ubyte = 0x1401, // GL_UNSIGNED_BYTE
	Ushort = 0x1403, // GL_UNSIGNED_SHORT
	Uint = 0x1405, // GL_UNSIGNED_INT
	Float = 0x1406, // GL_FLOAT
	Ushort4444 = 0x8033, // GL_UNSIGNED_SHORT_4_4_4_4
	Ushort5551 = 0x8034, // GL_UNSIGNED_SHORT_5_5_5_1
	Ushort565 = 0x8363, // GL_UNSIGNED_SHORT_5_6_5
	DepthStencil = 0x84FA, // EXT_UNSIGNED_INT_24_8_WEBGL
	Half = 0x8D61, // EXT_HALF
}

export const pixelFormat = (format: TextureFormat): PixelFormat => {
	switch (format) {
		case TextureFormat.Alpha8:
			return PixelFormat.Alpha;

		case TextureFormat.RGBA32:
		case TextureFormat.RGBA16:
		case TextureFormat.RGBAFloat:
		case TextureFormat.RGBAHalf:
		case TextureFormat.R5G5B5A1:
			return PixelFormat.RGBA;

		case TextureFormat.RGB24:
		case TextureFormat.R5G6B5:
			return PixelFormat.RGB;

		case TextureFormat.Depth16:
		case TextureFormat.Depth32:
			return PixelFormat.Depth;

		case TextureFormat.DepthStencil:
			return PixelFormat.DepthStencil;

		default:
			throw new RangeError();
	}
};

export const pixelType = (format: TextureFormat): PixelType => {
	switch (format) {
		case TextureFormat.Alpha8:
		case TextureFormat.RGBA32:
		case TextureFormat.RGB24:
			return PixelType.Ubyte;

		case TextureFormat.R5G5B5A1:
			return PixelType.Ushort5551;

		case TextureFormat.RGBA16:
			return PixelType.Ushort4444;

		case TextureFormat.R5G6B5:
			return PixelType.Ushort565;

		case TextureFormat.RGBAFloat:
			return PixelType.Float;

		case TextureFormat.RGBAHalf:
			return PixelType.Half;

		case TextureFormat.Depth16:
			return PixelType.Ushort;

		case TextureFormat.Depth32:
			return PixelType.Uint;

		case TextureFormat.DepthStencil:
			return PixelType.DepthStencil;

		default:
			throw new RangeError();
	}
};

export default TextureFormat;