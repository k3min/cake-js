import { TextureFormat } from '../Texture';
export interface Pixel {
    internalFormat: InternalFormat;
    format: Format;
    type: Type;
}
export declare enum InternalFormat {
    Alpha = 6406,
    RGB = 6407,
    RGBA = 6408,
    Luminance = 6409,
    LuminanceAlpha = 6410,
    DepthComponent = 6402,
    DepthStencil = 34041,
    R8 = 33321,
    R16F = 33325,
    R32F = 33326,
    R8UI = 33330,
    RG8 = 33323,
    RG16F = 33327,
    RG32F = 33328,
    RG8UI = 33336,
    RG16UI = 33338,
    RG32UI = 33340,
    RGB8 = 32849,
    SRGB8 = 35905,
    RGB565 = 36194,
    R11F_G11F_B10F = 35898,
    RGB9_E5 = 35901,
    RGB16F = 34843,
    RGB32F = 34837,
    RGB8UI = 36221,
    RGBA8 = 32856,
    SRGB8_ALPHA8 = 35907,
    RGB5_A1 = 32855,
    RGB10_A2 = 32857,
    RGBA4 = 32854,
    RGBA16F = 34842,
    RGBA32F = 34836,
    RGBA8UI = 36220
}
export declare enum Format {
    DepthComponent = 6402,
    DepthStencil = 34041,
    Alpha = 6406,
    Red = 6403,
    R = 6403,
    RG = 33319,
    RGB = 6407,
    RGBA = 6408,
    Luminance = 6409,
    LuminanceAlpha = 6410,
    RedInteger = 36244,
    RInteger = 36244,
    RGInteger = 33320,
    RGBInteger = 36248,
    RGBAInteger = 36249
}
export declare enum Type {
    Ubyte = 5121,
    Ushort_5_6_5 = 33635,
    Ushort_4_4_4_4 = 32819,
    Ushort_5_5_5_1 = 32820,
    Byte = 5120,
    Ushort = 5123,
    Short = 5122,
    Uint = 5125,
    Int = 5124,
    HalfFloat = 5131,
    Float = 5126,
    Uint_2_10_10_10 = 33640,
    Uint_10F_11F_11F = 35899,
    UInt_24_8 = 34042
}
export declare const pixel: (format: TextureFormat) => Pixel;
export default TextureFormat;
