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
