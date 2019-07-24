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