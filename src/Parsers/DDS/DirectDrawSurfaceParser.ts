import { Resource, ResourceType } from '../../Core';
import Exception from '../../Core/Exception';
import { BinaryReader } from '../../Core/Helpers';
import { TextureFormat } from '../../GL';
import DXGIFormat from './DXGIFormat';
import { CubeMapFlags, HeaderFlags, PixelFormatFlags, SurfaceFlags } from './Flags';
import { DirectDrawSurfaceHeader, DX10Header, PixelFormatHeader } from './Headers';
import PixelFormat from './PixelFormat';
import ResourceDimension from './ResourceDimension';

export const MAGIC = 0x20534444;

class PixelFormatStruct implements PixelFormatHeader {
	public readonly size: number;
	public readonly flags: PixelFormatFlags;
	public readonly fourCC: number;
	public readonly rgbBitCount: number;
	public readonly rBitMask: number;
	public readonly gBitMask: number;
	public readonly bBitMask: number;
	public readonly aBitMask: number;

	public constructor(br: BinaryReader) {
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

class DirectDrawSurfaceStruct implements DirectDrawSurfaceHeader {
	public readonly size: number;
	public readonly flags: HeaderFlags;
	public readonly height: number;
	public readonly width: number;
	public readonly pitchOrLinearSize: number;
	public readonly depth: number;
	public readonly mipmapCount: number;
	public readonly reserved1: number[] = new Array<number>(11);
	public readonly pixelFormat: PixelFormatHeader;
	public readonly surfaceFlags: SurfaceFlags;
	public readonly cubeMapFlags: CubeMapFlags;
	public readonly unused1: number;
	public readonly unused2: number;
	public readonly reserved2: number;

	public constructor(br: BinaryReader) {
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

class DX10HeaderStruct implements DX10Header {
	public readonly dxgiFormat: DXGIFormat;
	public readonly resourceDimension: ResourceDimension;
	public readonly miscFlag: number;
	public readonly arraySize: number;
	public readonly miscFlags2: number;

	public constructor(br: BinaryReader) {
		this.dxgiFormat = br.readUint32();
		this.resourceDimension = br.readUint32();
		this.miscFlag = br.readUint32();
		this.arraySize = br.readUint32();
		this.miscFlags2 = br.readUint32();
	}
}

class DirectDrawSurfaceParser {
	public readonly reader: BinaryReader;

	public readonly ddsHeader: DirectDrawSurfaceHeader;
	public readonly dx10Header?: DX10Header;

	public get isDX10(): boolean {
		const pf: PixelFormatStruct = this.ddsHeader.pixelFormat;

		return ((pf.flags & PixelFormatFlags.FourCC) === PixelFormatFlags.FourCC &&
		        (pf.fourCC === DirectDrawSurfaceParser.fourCC('DX10')));
	}

	public get mipmapCount(): number {
		return this.ddsHeader.mipmapCount;
	}

	public get width(): number {
		return this.ddsHeader.width;
	}

	public get height(): number {
		return this.ddsHeader.height;
	}

	public get textureFormat(): TextureFormat {
		const format = this.dx10Header ? this.dx10Header.dxgiFormat : (this.ddsHeader.pixelFormat.fourCC as PixelFormat);

		switch (format) {
			case PixelFormat.A32B32G32R32F:
			case DXGIFormat.rgba32_typeless:
			case DXGIFormat.rgba32_float:
				return TextureFormat.ARGBFloat;

			case PixelFormat.G32R32F:
			case DXGIFormat.rg32_typeless:
			case DXGIFormat.rg32_float:
				return TextureFormat.RGFloat;

			case PixelFormat.R32F:
			case DXGIFormat.r32_typeless:
			case DXGIFormat.r32_float:
				return TextureFormat.RFloat;

			case PixelFormat.A16B16G16R16F:
			case DXGIFormat.rgba16_typeless:
			case DXGIFormat.rgba16_float:
				return TextureFormat.ARGBHalf;

			case PixelFormat.G16R16F:
			case DXGIFormat.rg16_typeless:
			case DXGIFormat.rg16_float:
				return TextureFormat.RGHalf;

			case PixelFormat.R16F:
			case DXGIFormat.r16_typeless:
			case DXGIFormat.r16_float:
				return TextureFormat.RHalf;

			case DXGIFormat.rgb10a2_typeless:
			case DXGIFormat.rgb10a2_unorm:
			case DXGIFormat.rgb10a2_uint:
				return TextureFormat.ARGB2101010;

			case DXGIFormat.rgba8_sint:
			case DXGIFormat.rgba8_snorm:
			case DXGIFormat.rgba8_typeless:
			case DXGIFormat.rgba8_uint:
			case DXGIFormat.rgba8_unorm:
				return TextureFormat.ARGB32;

			case DXGIFormat.rg11b10_float:
				return TextureFormat.RGB111110Float;

			case DXGIFormat.rg8_typeless:
			case DXGIFormat.rg8_unorm:
			case DXGIFormat.rg8_uint:
			case DXGIFormat.rg8_snorm:
			case DXGIFormat.rg8_sint:
				return TextureFormat.RG16;

			case DXGIFormat.r8_typeless:
			case DXGIFormat.r8_unorm:
			case DXGIFormat.r8_uint:
			case DXGIFormat.r8_snorm:
			case DXGIFormat.r8_sint:
				return TextureFormat.R8;

			default:
				throw new RangeError();
		}
	}

	private constructor(reader: BinaryReader) {
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

	public static async load(uri: string): Promise<DirectDrawSurfaceParser> {
		let reader: BinaryReader;

		try {
			reader = await Resource.load<BinaryReader>(uri, ResourceType.DDS);
		} catch (e) {
			throw new Exception(`DirectDrawSurfaceParser: failed to load '${ uri }'`, e);
		}

		return new DirectDrawSurfaceParser(reader);
	}

	private validate(): void {
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

	public static fourCC(value: string): number {
		return (value.charCodeAt(0) << 0) +
		       (value.charCodeAt(1) << 8) +
		       (value.charCodeAt(2) << 16) +
		       (value.charCodeAt(3) << 24);
	}
}

export default DirectDrawSurfaceParser;