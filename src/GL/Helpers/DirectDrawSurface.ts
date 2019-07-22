import BinaryReader from '../../Helpers/BinaryReader';
import Resource, { ResourceType } from '../../Helpers/Resource';
import { TextureFormat } from '../Texture';

const MAGIC = 0x20534444;

export enum PixelFormatFlags {
	FourCC = 0x00000004,
	Rgb = 0x00000040,
	Rgba = 0x00000041,
	Luminance = 0x00020000,
	LuminanceAlpha = 0x00020001,
	Alpha = 0x00000002
}

export enum HeaderFlags {
	Texture = 0x00001007,
	Mipmap = 0x00020000,
	Volume = 0x00800000,
	Pitch = 0x00000008,
	LinearSize = 0x00080000,
	Height = 0x00000002,
	Width = 0x00000004
}

export enum SurfaceFlags {
	Texture = 0x00001000,
	Mipmap = 0x00400008,
	Complex = 0x00000008
}

export enum CubeMapFlags {
	CubeMap = 0x00000200,
	PositiveX = 0x00000600,
	NegativeX = 0x00000a00,
	PositiveY = 0x00001200,
	NegativeY = 0x00002200,
	PositiveZ = 0x00004200,
	NegativeZ = 0x00008200,
	Volume = 0x00200000,
}

export enum ResourceDimension {
	Unknown = 0,
	Buffer = 1,
	Texture1D = 2,
	Texture2D = 3,
	Texture3D = 4
}

export enum PixelFormat {
	A16B16G16R16 = 35,
	R16F = 111,
	G16R16F = 112,
	A16B16G16R16F = 113,
	R32F = 114,
	G32R32F = 115,
	A32B32G32R32F = 116
}

export enum DXGIFormat {
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
	r1_unorm = 66,
}

class PixelFormatStruct {
	public size: number;
	public flags: PixelFormatFlags;
	public fourCC: number;
	public rgbBitCount: number;
	public rBitMask: number;
	public gBitMask: number;
	public bBitMask: number;
	public aBitMask: number;

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

class HeaderStruct {
	public size: number;
	public flags: HeaderFlags;
	public height: number;
	public width: number;
	public pitchOrLinearSize: number;
	public depth: number;
	public mipMapCount: number;
	public reserved1: number[] = new Array<number>(11);
	public pixelFormat: PixelFormatStruct;
	public surfaceFlags: SurfaceFlags;
	public cubeMapFlags: CubeMapFlags;
	public unused1: number;
	public unused2: number;
	public reserved2: number;

	public constructor(br: BinaryReader) {
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
	public dxgiFormat: DXGIFormat;
	public resourceDimension: ResourceDimension;
	public miscFlag: number;
	public arraySize: number;
	public miscFlags2: number;

	public constructor(br: BinaryReader) {
		this.dxgiFormat = br.readUint32();
		this.resourceDimension = br.readUint32();
		this.miscFlag = br.readUint32();
		this.arraySize = br.readUint32();
		this.miscFlags2 = br.readUint32();
	}
}

class DirectDrawSurface {
	public readonly reader: BinaryReader;
	public readonly header: HeaderStruct;
	public readonly headerDX10?: HeaderDX10Struct;

	public get dx10(): boolean {
		return (this.header.pixelFormat.fourCC === DirectDrawSurface.fourCC('DX10'));
	}

	public get mipMapCount(): number {
		return this.header.mipMapCount;
	}

	public get width(): number {
		return this.header.width;
	}

	public get height(): number {
		return this.header.height;
	}

	public get textureFormat(): TextureFormat {
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

	private constructor(reader: BinaryReader) {
		this.reader = reader;

		if (this.reader.readUint32() !== MAGIC) {
			throw new ReferenceError('Not a DirectDrawSurface!');
		}

		this.header = new HeaderStruct(this.reader);

		const pf: PixelFormatStruct = this.header.pixelFormat;

		if ((pf.flags & PixelFormatFlags.FourCC) === 0 || !this.dx10) {
			return;
		}

		this.headerDX10 = new HeaderDX10Struct(this.reader);

		this.validate();
	}

	public static async load(url: string): Promise<DirectDrawSurface> {
		const reader: BinaryReader = await Resource.load<BinaryReader>(url, ResourceType.DDS);

		return new DirectDrawSurface(reader);
	}

	private validate(): void {
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

	public static fourCC(value: string): number {
		return (value.charCodeAt(0) << 0) +
		       (value.charCodeAt(1) << 8) +
		       (value.charCodeAt(2) << 16) +
		       (value.charCodeAt(3) << 24);
	}

	public static bitsPerPixel(format: DXGIFormat): number {
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