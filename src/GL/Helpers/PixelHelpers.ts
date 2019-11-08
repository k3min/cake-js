import { TextureFormat } from '../Texture';

export interface Pixel {
	internalFormat: InternalFormat;
	format: Format;
	type: Type;
}

export enum InternalFormat {
	Alpha = 0x1906, // GL_ALPHA
	RGB = 0x1907, // GL_RGB
	RGBA = 0x1908, // GL_RGBA
	Luminance = 0x1909, // GL_LUMINANCE
	LuminanceAlpha = 0x190a, // GL_LUMINANCE_ALPHA
	DepthComponent = 0x1902, // GL_DEPTH_COMPONENT
	DepthStencil = 0x84f9, // GL_DEPTH_STENCIL
	R8 = 0x8229, // GL_R8
	R16F = 0x822d, // GL_R16F
	R32F = 0x822e, // GL_R32F
	R8UI = 0x8232, // GL_R8UI
	RG8 = 0x822b, // GL_RG8
	RG16F = 0x822f, // GL_RG16F
	RG32F = 0x8230, // GL_RG32F
	RG8UI = 0x8238, // GL_RG8UI
	RG16UI = 0x823a, // GL_RG16UI
	RG32UI = 0x823c, // GL_RG32UI
	RGB8 = 0x8051, // GL_RGB8
	SRGB8 = 0x8c41, // GL_SRGB8
	RGB565 = 0x8d62, // GL_RGB565
	R11F_G11F_B10F = 0x8c3a, // GL_R11F_G11F_B10F
	RGB9_E5 = 0x8c3d, // GL_RGB9_E5
	RGB16F = 0x881b, // GL_RGB16F
	RGB32F = 0x8815, // GL_RGB32F
	RGB8UI = 0x8d7d, // GL_RGB8UI
	RGBA8 = 0x8058, // GL_RGBA8
	SRGB8_ALPHA8 = 0x8c43, // GL_SRGB8_ALPHA8
	RGB5_A1 = 0x8057, // GL_RGB5_A1
	RGB10_A2 = 0x8059, // GL_RGB10_A2
	RGBA4 = 0x8056, // GL_RGBA4
	RGBA16F = 0x881a, // GL_RGBA16F
	RGBA32F = 0x8814, // GL_RGBA32F
	RGBA8UI = 0x8d7c, // GL_RGBA8UI
}

export enum Format {
	DepthComponent = 0x1902, // GL_DEPTH_COMPONENT
	DepthStencil = 0x84f9, // GL_DEPTH_STENCIL
	Alpha = 0x1906, // GL_ALPHA
	Red = 0x1903, // GL_RED
	R = 0x1903, // GL_RED
	RG = 0x8227, // GL_RG
	RGB = 0x1907, // GL_RGB
	RGBA = 0x1908, // GL_RGBA
	Luminance = 0x1909, // GL_LUMINANCE
	LuminanceAlpha = 0x190a, // GL_LUMINANCE_ALPHA
	RedInteger = 0x8d94, // GL_RED_INTEGER
	RInteger = 0x8d94, // GL_RED_INTEGER
	RGInteger = 0x8228, // GL_RG_INTEGER
	RGBInteger = 0x8d98, // GL_RGB_INTEGER
	RGBAInteger = 0x8d99, // GL_RGBA_INTEGER
}

export enum Type {
	Ubyte = 0x1401, // GL_UNSIGNED_BYTE
	Ushort_5_6_5 = 0x8363, // GL_UNSIGNED_SHORT_5_6_5
	Ushort_4_4_4_4 = 0x8033, // GL_UNSIGNED_SHORT_4_4_4_4
	Ushort_5_5_5_1 = 0x8034, // GL_UNSIGNED_SHORT_5_5_5_1
	Byte = 0x1400, // GL_BYTE
	Ushort = 0x1403, // GL_UNSIGNED_SHORT
	Short = 0x1402, // GL_SHORT
	Uint = 0x1405, // GL_UNSIGNED_INT
	Int = 0x1404, // GL_INT
	HalfFloat = 0x140b, // GL_HALF_FLOAT
	Float = 0x1406, // GL_FLOAT
	Uint_2_10_10_10 = 0x8368, // GL_UNSIGNED_INT_2_10_10_10_REV
	Uint_10F_11F_11F = 0x8c3b, // GL_UNSIGNED_INT_10F_11F_11F_REV
	UInt_24_8 = 0x84fa, // GL_UNSIGNED_INT_24_8
}

export const pixel = (format: TextureFormat): Pixel => {
	switch (format) {
		case TextureFormat.ARGB32:
			return {
				internalFormat: InternalFormat.RGBA8,
				format: Format.RGBA,
				type: Type.Ubyte,
			};

		case TextureFormat.Depth:
			return {
				internalFormat: InternalFormat.DepthStencil,
				format: Format.DepthStencil,
				type: Type.UInt_24_8,
			};

		case TextureFormat.ARGBHalf:
			return {
				internalFormat: InternalFormat.RGBA16F,
				format: Format.RGBA,
				type: Type.Float,
			};

		case TextureFormat.RGB565:
			return {
				internalFormat: InternalFormat.RGB565,
				format: Format.RGBA,
				type: Type.Ushort_5_6_5,
			};

		case TextureFormat.ARGB4444:
			return {
				internalFormat: InternalFormat.RGBA4,
				format: Format.RGBA,
				type: Type.Ushort_4_4_4_4,
			};

		case TextureFormat.ARGB1555:
			return {
				internalFormat: InternalFormat.RGB5_A1,
				format: Format.RGBA,
				type: Type.Ushort_5_5_5_1,
			};

		case TextureFormat.ARGB2101010:
			return {
				internalFormat: InternalFormat.RGB10_A2,
				format: Format.RGBA,
				type: Type.Uint_2_10_10_10,
			};

		case TextureFormat.ARGBFloat:
			return {
				internalFormat: InternalFormat.RGBA32F,
				format: Format.RGBA,
				type: Type.Float,
			};

		case TextureFormat.RGFloat:
			return {
				internalFormat: InternalFormat.RG32F,
				format: Format.RG,
				type: Type.Float,
			};

		case TextureFormat.RGHalf:
			return {
				internalFormat: InternalFormat.RG16F,
				format: Format.RG,
				type: Type.Float,
			};

		case TextureFormat.RFloat:
			return {
				internalFormat: InternalFormat.R32F,
				format: Format.R,
				type: Type.Float,
			};

		case TextureFormat.RHalf:
			return {
				internalFormat: InternalFormat.R16F,
				format: Format.R,
				type: Type.Float,
			};

		case TextureFormat.R8:
			return {
				internalFormat: InternalFormat.R8,
				format: Format.R,
				type: Type.Ubyte,
			};

		case TextureFormat.RGB111110Float:
			return {
				internalFormat: InternalFormat.R11F_G11F_B10F,
				format: Format.RGB,
				type: Type.Float,
			};

		case TextureFormat.RG16:
			return {
				internalFormat: InternalFormat.RG8,
				format: Format.RG,
				type: Type.Ubyte,
			};
	}
};

export default TextureFormat;