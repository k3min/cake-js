import { Resource, ResourceType } from '../../Core';
import { TextureFormat } from '../../GL';
import Exception from '../../Core/Exception';
import DXGIFormat from './DXGIFormat';
import { HeaderFlags, PixelFormatFlags } from './Flags';
import PixelFormat from './PixelFormat';
import ResourceDimension from './ResourceDimension';
export const MAGIC = 0x20534444;
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
class DirectDrawSurfaceStruct {
    constructor(br) {
        this.reserved1 = new Array(11);
        this.size = br.readUint32();
        this.flags = br.readUint32();
        this.height = br.readUint32();
        this.width = br.readUint32();
        this.pitchOrLinearSize = br.readUint32();
        this.depth = br.readUint32();
        this.mipmapCount = br.readUint32();
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
class DX10HeaderStruct {
    constructor(br) {
        this.dxgiFormat = br.readUint32();
        this.resourceDimension = br.readUint32();
        this.miscFlag = br.readUint32();
        this.arraySize = br.readUint32();
        this.miscFlags2 = br.readUint32();
    }
}
class DirectDrawSurfaceParser {
    get isDX10() {
        const pf = this.ddsHeader.pixelFormat;
        return ((pf.flags & PixelFormatFlags.FourCC) === PixelFormatFlags.FourCC &&
            (pf.fourCC === DirectDrawSurfaceParser.fourCC('DX10')));
    }
    get mipmapCount() {
        return this.ddsHeader.mipmapCount;
    }
    get width() {
        return this.ddsHeader.width;
    }
    get height() {
        return this.ddsHeader.height;
    }
    get textureFormat() {
        const format = this.dx10Header ? this.dx10Header.dxgiFormat : this.ddsHeader.pixelFormat.fourCC;
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
        this.ddsHeader = new DirectDrawSurfaceStruct(this.reader);
        if (!this.isDX10) {
            return;
        }
        this.dx10Header = new DX10HeaderStruct(this.reader);
        this.validate();
    }
    static async load(uri) {
        let reader;
        try {
            reader = await Resource.load(uri, ResourceType.DDS);
        }
        catch (e) {
            throw new Exception(`DirectDrawSurfaceParser: failed to load '${uri}'`, e);
        }
        return new DirectDrawSurfaceParser(reader);
    }
    validate() {
        if (!this.dx10Header) {
            return;
        }
        if (this.dx10Header.arraySize === 0) {
            throw new RangeError('Unexpected array size!');
        }
        if (!Object.values(DXGIFormat).includes(this.dx10Header.dxgiFormat)) {
            throw new ReferenceError('Invalid format!');
        }
        switch (this.dx10Header.resourceDimension) {
            case ResourceDimension.Texture1D:
                if ((this.ddsHeader.flags & HeaderFlags.Height) !== 0 && this.ddsHeader.height !== 1) {
                    throw new ReferenceError('Unexpected height!');
                }
                break;
            case ResourceDimension.Texture2D:
                break;
            case ResourceDimension.Texture3D:
                if ((this.ddsHeader.flags & HeaderFlags.Volume) === 0) {
                    throw new ReferenceError('Texture3D has no volume flag!');
                }
                if (this.dx10Header.arraySize > 1) {
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
}
export default DirectDrawSurfaceParser;
