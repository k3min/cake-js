var TextureFormat;
(function (TextureFormat) {
    TextureFormat[TextureFormat["Alpha8"] = 0] = "Alpha8";
    TextureFormat[TextureFormat["RGB24"] = 1] = "RGB24";
    TextureFormat[TextureFormat["RGBA32"] = 2] = "RGBA32";
    TextureFormat[TextureFormat["R5G6B5"] = 3] = "R5G6B5";
    TextureFormat[TextureFormat["R5G5B5A1"] = 4] = "R5G5B5A1";
    TextureFormat[TextureFormat["RGBA16"] = 5] = "RGBA16";
    TextureFormat[TextureFormat["RGBAFloat"] = 6] = "RGBAFloat";
    TextureFormat[TextureFormat["Depth16"] = 7] = "Depth16";
    TextureFormat[TextureFormat["Depth32"] = 8] = "Depth32";
    TextureFormat[TextureFormat["DepthStencil"] = 9] = "DepthStencil";
})(TextureFormat || (TextureFormat = {}));
export var PixelFormat;
(function (PixelFormat) {
    PixelFormat[PixelFormat["Depth"] = 6402] = "Depth";
    PixelFormat[PixelFormat["Alpha"] = 6406] = "Alpha";
    PixelFormat[PixelFormat["RGB"] = 6407] = "RGB";
    PixelFormat[PixelFormat["RGBA"] = 6408] = "RGBA";
    PixelFormat[PixelFormat["DepthStencil"] = 34041] = "DepthStencil";
})(PixelFormat || (PixelFormat = {}));
export var PixelType;
(function (PixelType) {
    PixelType[PixelType["Ubyte"] = 5121] = "Ubyte";
    PixelType[PixelType["Ushort"] = 5123] = "Ushort";
    PixelType[PixelType["Uint"] = 5125] = "Uint";
    PixelType[PixelType["Float"] = 5126] = "Float";
    PixelType[PixelType["Ushort4444"] = 32819] = "Ushort4444";
    PixelType[PixelType["Ushort5551"] = 32820] = "Ushort5551";
    PixelType[PixelType["Ushort565"] = 33635] = "Ushort565";
    PixelType[PixelType["DepthStencil"] = 34042] = "DepthStencil";
})(PixelType || (PixelType = {}));
export const pixelFormat = (format) => {
    switch (format) {
        case TextureFormat.Alpha8:
            return PixelFormat.Alpha;
        case TextureFormat.RGBA32:
        case TextureFormat.RGBA16:
        case TextureFormat.RGBAFloat:
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
export const pixelType = (format) => {
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
