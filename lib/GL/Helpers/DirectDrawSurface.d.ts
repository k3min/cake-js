import BinaryReader from '../../Helpers/BinaryReader';
import { TextureFormat } from '../Texture';
export declare enum PixelFormatFlags {
    FourCC = 4,
    Rgb = 64,
    Rgba = 65,
    Luminance = 131072,
    LuminanceAlpha = 131073,
    Alpha = 2
}
export declare enum HeaderFlags {
    Texture = 4103,
    Mipmap = 131072,
    Volume = 8388608,
    Pitch = 8,
    LinearSize = 524288,
    Height = 2,
    Width = 4
}
export declare enum SurfaceFlags {
    Texture = 4096,
    Mipmap = 4194312,
    Complex = 8
}
export declare enum CubeMapFlags {
    CubeMap = 512,
    PositiveX = 1536,
    NegativeX = 2560,
    PositiveY = 4608,
    NegativeY = 8704,
    PositiveZ = 16896,
    NegativeZ = 33280,
    Volume = 2097152
}
export declare enum ResourceDimension {
    Unknown = 0,
    Buffer = 1,
    Texture1D = 2,
    Texture2D = 3,
    Texture3D = 4
}
export declare enum PixelFormat {
    A16B16G16R16 = 35,
    R16F = 111,
    G16R16F = 112,
    A16B16G16R16F = 113,
    R32F = 114,
    G32R32F = 115,
    A32B32G32R32F = 116
}
export declare enum DXGIFormat {
    unknown = 0,
    rgba32_typeless = 1,
    rgba32_float = 2,
    rgba32_uint = 3,
    rgba32_sint = 4,
    rgb32_typeless = 5,
    rgb32_float = 6,
    rgb32_uint = 7,
    rgb32_sint = 8,
    rgba16_typeless = 9,
    rgba16_float = 10,
    rgba16_unorm = 11,
    rgba16_uint = 12,
    rgba16_snorm = 13,
    rgba16_sint = 14,
    rg32_typeless = 15,
    rg32_float = 16,
    rg32_uint = 17,
    rg32_sint = 18,
    rgb10a2_typeless = 23,
    rgb10a2_unorm = 24,
    rgb10a2_uint = 25,
    rg11b10_float = 26,
    rgba8_typeless = 27,
    rgba8_unorm = 28,
    rgba8_unorm_srgb = 29,
    rgba8_uint = 30,
    rgba8_snorm = 31,
    rgba8_sint = 32,
    rg16_typeless = 33,
    rg16_float = 34,
    rg16_unorm = 35,
    rg16_uint = 36,
    rg16_snorm = 37,
    rg16_sint = 38,
    r32_typeless = 39,
    r32_float = 41,
    r32_uint = 42,
    r32_sint = 43,
    r24g8_typeless = 44,
    rg8_typeless = 48,
    rg8_unorm = 49,
    rg8_uint = 50,
    rg8_snorm = 51,
    rg8_sint = 52,
    r16_typeless = 53,
    r16_float = 54,
    r16_unorm = 56,
    r16_uint = 57,
    r16_snorm = 58,
    r16_sint = 59,
    r8_typeless = 60,
    r8_unorm = 61,
    r8_uint = 62,
    r8_snorm = 63,
    r8_sint = 64,
    a8_unorm = 65,
    r1_unorm = 66
}
declare class PixelFormatStruct {
    size: number;
    flags: PixelFormatFlags;
    fourCC: number;
    rgbBitCount: number;
    rBitMask: number;
    gBitMask: number;
    bBitMask: number;
    aBitMask: number;
    constructor(br: BinaryReader);
}
declare class HeaderStruct {
    size: number;
    flags: HeaderFlags;
    height: number;
    width: number;
    pitchOrLinearSize: number;
    depth: number;
    mipMapCount: number;
    reserved1: number[];
    pixelFormat: PixelFormatStruct;
    surfaceFlags: SurfaceFlags;
    cubeMapFlags: CubeMapFlags;
    unused1: number;
    unused2: number;
    reserved2: number;
    constructor(br: BinaryReader);
}
declare class HeaderDX10Struct {
    dxgiFormat: DXGIFormat;
    resourceDimension: ResourceDimension;
    miscFlag: number;
    arraySize: number;
    miscFlags2: number;
    constructor(br: BinaryReader);
}
declare class DirectDrawSurface {
    readonly reader: BinaryReader;
    readonly header: HeaderStruct;
    readonly headerDX10?: HeaderDX10Struct;
    readonly dx10: boolean;
    readonly mipMapCount: number;
    readonly width: number;
    readonly height: number;
    readonly textureFormat: TextureFormat;
    private constructor();
    static load(url: string): Promise<DirectDrawSurface>;
    private validate;
    static fourCC(value: string): number;
    static bitsPerPixel(format: DXGIFormat): number;
}
export default DirectDrawSurface;
