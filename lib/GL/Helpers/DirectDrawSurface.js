import Resource, { ResourceType } from '../../Helpers/Resource';
import { TextureFormat } from '../Texture';
const MAGIC = 0x20534444;
export var PixelFormatFlags;
(function (PixelFormatFlags) {
    PixelFormatFlags[PixelFormatFlags["FourCC"] = 4] = "FourCC";
    PixelFormatFlags[PixelFormatFlags["Rgb"] = 64] = "Rgb";
    PixelFormatFlags[PixelFormatFlags["Rgba"] = 65] = "Rgba";
    PixelFormatFlags[PixelFormatFlags["Luminance"] = 131072] = "Luminance";
    PixelFormatFlags[PixelFormatFlags["LuminanceAlpha"] = 131073] = "LuminanceAlpha";
    PixelFormatFlags[PixelFormatFlags["Alpha"] = 2] = "Alpha";
})(PixelFormatFlags || (PixelFormatFlags = {}));
export var HeaderFlags;
(function (HeaderFlags) {
    HeaderFlags[HeaderFlags["Texture"] = 4103] = "Texture";
    HeaderFlags[HeaderFlags["Mipmap"] = 131072] = "Mipmap";
    HeaderFlags[HeaderFlags["Volume"] = 8388608] = "Volume";
    HeaderFlags[HeaderFlags["Pitch"] = 8] = "Pitch";
    HeaderFlags[HeaderFlags["LinearSize"] = 524288] = "LinearSize";
    HeaderFlags[HeaderFlags["Height"] = 2] = "Height";
    HeaderFlags[HeaderFlags["Width"] = 4] = "Width";
})(HeaderFlags || (HeaderFlags = {}));
export var SurfaceFlags;
(function (SurfaceFlags) {
    SurfaceFlags[SurfaceFlags["Texture"] = 4096] = "Texture";
    SurfaceFlags[SurfaceFlags["Mipmap"] = 4194312] = "Mipmap";
    SurfaceFlags[SurfaceFlags["Complex"] = 8] = "Complex";
})(SurfaceFlags || (SurfaceFlags = {}));
export var CubeMapFlags;
(function (CubeMapFlags) {
    CubeMapFlags[CubeMapFlags["CubeMap"] = 512] = "CubeMap";
    CubeMapFlags[CubeMapFlags["PositiveX"] = 1536] = "PositiveX";
    CubeMapFlags[CubeMapFlags["NegativeX"] = 2560] = "NegativeX";
    CubeMapFlags[CubeMapFlags["PositiveY"] = 4608] = "PositiveY";
    CubeMapFlags[CubeMapFlags["NegativeY"] = 8704] = "NegativeY";
    CubeMapFlags[CubeMapFlags["PositiveZ"] = 16896] = "PositiveZ";
    CubeMapFlags[CubeMapFlags["NegativeZ"] = 33280] = "NegativeZ";
    CubeMapFlags[CubeMapFlags["Volume"] = 2097152] = "Volume";
})(CubeMapFlags || (CubeMapFlags = {}));
export var ResourceDimension;
(function (ResourceDimension) {
    ResourceDimension[ResourceDimension["Unknown"] = 0] = "Unknown";
    ResourceDimension[ResourceDimension["Buffer"] = 1] = "Buffer";
    ResourceDimension[ResourceDimension["Texture1D"] = 2] = "Texture1D";
    ResourceDimension[ResourceDimension["Texture2D"] = 3] = "Texture2D";
    ResourceDimension[ResourceDimension["Texture3D"] = 4] = "Texture3D";
})(ResourceDimension || (ResourceDimension = {}));
export var PixelFormat;
(function (PixelFormat) {
    PixelFormat[PixelFormat["A16B16G16R16"] = 35] = "A16B16G16R16";
    PixelFormat[PixelFormat["R16F"] = 111] = "R16F";
    PixelFormat[PixelFormat["G16R16F"] = 112] = "G16R16F";
    PixelFormat[PixelFormat["A16B16G16R16F"] = 113] = "A16B16G16R16F";
    PixelFormat[PixelFormat["R32F"] = 114] = "R32F";
    PixelFormat[PixelFormat["G32R32F"] = 115] = "G32R32F";
    PixelFormat[PixelFormat["A32B32G32R32F"] = 116] = "A32B32G32R32F";
})(PixelFormat || (PixelFormat = {}));
export var DXGIFormat;
(function (DXGIFormat) {
    DXGIFormat[DXGIFormat["unknown"] = 0] = "unknown";
    DXGIFormat[DXGIFormat["rgba32_typeless"] = 1] = "rgba32_typeless";
    DXGIFormat[DXGIFormat["rgba32_float"] = 2] = "rgba32_float";
    DXGIFormat[DXGIFormat["rgba32_uint"] = 3] = "rgba32_uint";
    DXGIFormat[DXGIFormat["rgba32_sint"] = 4] = "rgba32_sint";
    DXGIFormat[DXGIFormat["rgb32_typeless"] = 5] = "rgb32_typeless";
    DXGIFormat[DXGIFormat["rgb32_float"] = 6] = "rgb32_float";
    DXGIFormat[DXGIFormat["rgb32_uint"] = 7] = "rgb32_uint";
    DXGIFormat[DXGIFormat["rgb32_sint"] = 8] = "rgb32_sint";
    DXGIFormat[DXGIFormat["rgba16_typeless"] = 9] = "rgba16_typeless";
    DXGIFormat[DXGIFormat["rgba16_float"] = 10] = "rgba16_float";
    DXGIFormat[DXGIFormat["rgba16_unorm"] = 11] = "rgba16_unorm";
    DXGIFormat[DXGIFormat["rgba16_uint"] = 12] = "rgba16_uint";
    DXGIFormat[DXGIFormat["rgba16_snorm"] = 13] = "rgba16_snorm";
    DXGIFormat[DXGIFormat["rgba16_sint"] = 14] = "rgba16_sint";
    DXGIFormat[DXGIFormat["rg32_typeless"] = 15] = "rg32_typeless";
    DXGIFormat[DXGIFormat["rg32_float"] = 16] = "rg32_float";
    DXGIFormat[DXGIFormat["rg32_uint"] = 17] = "rg32_uint";
    DXGIFormat[DXGIFormat["rg32_sint"] = 18] = "rg32_sint";
    DXGIFormat[DXGIFormat["rgb10a2_typeless"] = 23] = "rgb10a2_typeless";
    DXGIFormat[DXGIFormat["rgb10a2_unorm"] = 24] = "rgb10a2_unorm";
    DXGIFormat[DXGIFormat["rgb10a2_uint"] = 25] = "rgb10a2_uint";
    DXGIFormat[DXGIFormat["rg11b10_float"] = 26] = "rg11b10_float";
    DXGIFormat[DXGIFormat["rgba8_typeless"] = 27] = "rgba8_typeless";
    DXGIFormat[DXGIFormat["rgba8_unorm"] = 28] = "rgba8_unorm";
    DXGIFormat[DXGIFormat["rgba8_unorm_srgb"] = 29] = "rgba8_unorm_srgb";
    DXGIFormat[DXGIFormat["rgba8_uint"] = 30] = "rgba8_uint";
    DXGIFormat[DXGIFormat["rgba8_snorm"] = 31] = "rgba8_snorm";
    DXGIFormat[DXGIFormat["rgba8_sint"] = 32] = "rgba8_sint";
    DXGIFormat[DXGIFormat["rg16_typeless"] = 33] = "rg16_typeless";
    DXGIFormat[DXGIFormat["rg16_float"] = 34] = "rg16_float";
    DXGIFormat[DXGIFormat["rg16_unorm"] = 35] = "rg16_unorm";
    DXGIFormat[DXGIFormat["rg16_uint"] = 36] = "rg16_uint";
    DXGIFormat[DXGIFormat["rg16_snorm"] = 37] = "rg16_snorm";
    DXGIFormat[DXGIFormat["rg16_sint"] = 38] = "rg16_sint";
    DXGIFormat[DXGIFormat["r32_typeless"] = 39] = "r32_typeless";
    DXGIFormat[DXGIFormat["r32_float"] = 41] = "r32_float";
    DXGIFormat[DXGIFormat["r32_uint"] = 42] = "r32_uint";
    DXGIFormat[DXGIFormat["r32_sint"] = 43] = "r32_sint";
    DXGIFormat[DXGIFormat["r24g8_typeless"] = 44] = "r24g8_typeless";
    DXGIFormat[DXGIFormat["rg8_typeless"] = 48] = "rg8_typeless";
    DXGIFormat[DXGIFormat["rg8_unorm"] = 49] = "rg8_unorm";
    DXGIFormat[DXGIFormat["rg8_uint"] = 50] = "rg8_uint";
    DXGIFormat[DXGIFormat["rg8_snorm"] = 51] = "rg8_snorm";
    DXGIFormat[DXGIFormat["rg8_sint"] = 52] = "rg8_sint";
    DXGIFormat[DXGIFormat["r16_typeless"] = 53] = "r16_typeless";
    DXGIFormat[DXGIFormat["r16_float"] = 54] = "r16_float";
    DXGIFormat[DXGIFormat["r16_unorm"] = 56] = "r16_unorm";
    DXGIFormat[DXGIFormat["r16_uint"] = 57] = "r16_uint";
    DXGIFormat[DXGIFormat["r16_snorm"] = 58] = "r16_snorm";
    DXGIFormat[DXGIFormat["r16_sint"] = 59] = "r16_sint";
    DXGIFormat[DXGIFormat["r8_typeless"] = 60] = "r8_typeless";
    DXGIFormat[DXGIFormat["r8_unorm"] = 61] = "r8_unorm";
    DXGIFormat[DXGIFormat["r8_uint"] = 62] = "r8_uint";
    DXGIFormat[DXGIFormat["r8_snorm"] = 63] = "r8_snorm";
    DXGIFormat[DXGIFormat["r8_sint"] = 64] = "r8_sint";
    DXGIFormat[DXGIFormat["a8_unorm"] = 65] = "a8_unorm";
    DXGIFormat[DXGIFormat["r1_unorm"] = 66] = "r1_unorm";
})(DXGIFormat || (DXGIFormat = {}));
class PixelFormatStruct {
    constructor(br) {
        this.size = br.readUint32();
        this.flags = br.readUint32();
        this.fourCC = br.readUint32();
        this.rgbBitCount = br.readInt32();
        this.rBitMask = br.readUint32();
        this.gBitMask = br.readUint32();
        this.bBitMask = br.readUint32();
        this.aBitMask = br.readUint32();
    }
}
class HeaderStruct {
    constructor(br) {
        this.reserved1 = new Array(11);
        this.size = br.readUint32();
        this.flags = br.readUint32();
        this.height = br.readUint32();
        this.width = br.readUint32();
        this.pitchOrLinearSize = br.readUint32();
        this.depth = br.readUint32();
        this.mipMapCount = br.readUint32();
        for (let i = 0; i < this.reserved1.length; i++) {
            this.reserved1[i] = br.readUint32();
        }
        this.pixelFormat = new PixelFormatStruct(br);
        this.surfaceFlags = br.readUint32();
        this.cubeMapFlags = br.readUint32();
        this.unused1 = br.readUint32();
        this.unused2 = br.readUint32();
        this.reserved2 = br.readUint32();
    }
}
class HeaderDX10Struct {
    constructor(br) {
        this.dxgiFormat = br.readUint32();
        this.resourceDimension = br.readUint32();
        this.miscFlag = br.readUint32();
        this.arraySize = br.readUint32();
        this.miscFlags2 = br.readUint32();
    }
}
class DirectDrawSurface {
    get dx10() {
        return (this.header.pixelFormat.fourCC === DirectDrawSurface.fourCC('DX10'));
    }
    get mipMapCount() {
        return this.header.mipMapCount;
    }
    get width() {
        return this.header.width;
    }
    get height() {
        return this.header.height;
    }
    get textureFormat() {
        const format = this.headerDX10 ? this.headerDX10.dxgiFormat : this.header.pixelFormat.fourCC;
        switch (format) {
            case DXGIFormat.rgba32_float:
            case PixelFormat.A32B32G32R32F:
                return TextureFormat.RGBAFloat;
            case DXGIFormat.rgba8_sint:
            case DXGIFormat.rgba8_snorm:
            case DXGIFormat.rgba8_typeless:
            case DXGIFormat.rgba8_uint:
            case DXGIFormat.rgba8_unorm:
            case DXGIFormat.rgba8_unorm_srgb:
                return TextureFormat.RGBA32;
            default:
                throw new RangeError();
        }
    }
    constructor(reader) {
        this.reader = reader;
        if (this.reader.readUint32() !== MAGIC) {
            throw new ReferenceError('Not a DirectDrawSurface!');
        }
        this.header = new HeaderStruct(this.reader);
        const pf = this.header.pixelFormat;
        if ((pf.flags & PixelFormatFlags.FourCC) === 0 || !this.dx10) {
            return;
        }
        this.headerDX10 = new HeaderDX10Struct(this.reader);
        this.validate();
    }
    static async load(url) {
        const reader = await Resource.load(url, ResourceType.DDS);
        return new DirectDrawSurface(reader);
    }
    validate() {
        if (!this.headerDX10) {
            return;
        }
        if (this.headerDX10.arraySize === 0) {
            throw new RangeError('Unexpected array size!');
        }
        if (!Object.values(DXGIFormat).includes(this.headerDX10.dxgiFormat)) {
            throw new ReferenceError('Invalid format!');
        }
        switch (this.headerDX10.resourceDimension) {
            case ResourceDimension.Texture1D:
                if ((this.header.flags & HeaderFlags.Height) !== 0 && this.header.height !== 1) {
                    throw new ReferenceError('Unexpected height!');
                }
                break;
            case ResourceDimension.Texture2D:
                break;
            case ResourceDimension.Texture3D:
                if ((this.header.flags & HeaderFlags.Volume) === 0) {
                    throw new ReferenceError('Texture3D has no volume flag!');
                }
                if (this.headerDX10.arraySize > 1) {
                    throw new RangeError('Unexpected array size!');
                }
                break;
            default:
                throw new RangeError();
        }
    }
    static fourCC(value) {
        return (value.charCodeAt(0) << 0) +
            (value.charCodeAt(1) << 8) +
            (value.charCodeAt(2) << 16) +
            (value.charCodeAt(3) << 24);
    }
    static bitsPerPixel(format) {
        switch (format) {
            case DXGIFormat.r1_unorm:
                return 1;
            case DXGIFormat.a8_unorm:
            case DXGIFormat.r8_sint:
            case DXGIFormat.r8_snorm:
            case DXGIFormat.r8_typeless:
            case DXGIFormat.r8_uint:
            case DXGIFormat.r8_unorm:
                return 8;
            case DXGIFormat.r16_float:
            case DXGIFormat.r16_sint:
            case DXGIFormat.r16_snorm:
            case DXGIFormat.r16_typeless:
            case DXGIFormat.r16_uint:
            case DXGIFormat.r16_unorm:
            case DXGIFormat.rg8_sint:
            case DXGIFormat.rg8_snorm:
            case DXGIFormat.rg8_typeless:
            case DXGIFormat.rg8_uint:
            case DXGIFormat.rg8_unorm:
                return 16;
            case DXGIFormat.rgb10a2_typeless:
            case DXGIFormat.rgb10a2_uint:
            case DXGIFormat.rgb10a2_unorm:
            case DXGIFormat.rg11b10_float:
            case DXGIFormat.rg16_float:
            case DXGIFormat.rg16_sint:
            case DXGIFormat.rg16_snorm:
            case DXGIFormat.rg16_typeless:
            case DXGIFormat.rg16_uint:
            case DXGIFormat.rg16_unorm:
            case DXGIFormat.r24g8_typeless:
            case DXGIFormat.r32_float:
            case DXGIFormat.r32_sint:
            case DXGIFormat.r32_typeless:
            case DXGIFormat.r32_uint:
            case DXGIFormat.rgba8_sint:
            case DXGIFormat.rgba8_snorm:
            case DXGIFormat.rgba8_typeless:
            case DXGIFormat.rgba8_uint:
            case DXGIFormat.rgba8_unorm:
            case DXGIFormat.rgba8_unorm_srgb:
                return 32;
            case DXGIFormat.rgba16_float:
            case DXGIFormat.rgba16_sint:
            case DXGIFormat.rgba16_snorm:
            case DXGIFormat.rgba16_typeless:
            case DXGIFormat.rgba16_uint:
            case DXGIFormat.rgba16_unorm:
            case DXGIFormat.rg32_float:
            case DXGIFormat.rg32_sint:
            case DXGIFormat.rg32_typeless:
            case DXGIFormat.rg32_uint:
                return 64;
            case DXGIFormat.rgb32_float:
            case DXGIFormat.rgb32_sint:
            case DXGIFormat.rgb32_typeless:
            case DXGIFormat.rgb32_uint:
                return 96;
            case DXGIFormat.rgba32_float:
            case DXGIFormat.rgba32_sint:
            case DXGIFormat.rgba32_typeless:
            case DXGIFormat.rgba32_uint:
                return 128;
            default:
                throw new RangeError();
        }
    }
}
export default DirectDrawSurface;
