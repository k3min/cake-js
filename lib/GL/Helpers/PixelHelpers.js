import { TextureFormat } from '../Texture';
export var InternalFormat;
(function (InternalFormat) {
    InternalFormat[InternalFormat["Alpha"] = 6406] = "Alpha";
    InternalFormat[InternalFormat["RGB"] = 6407] = "RGB";
    InternalFormat[InternalFormat["RGBA"] = 6408] = "RGBA";
    InternalFormat[InternalFormat["Luminance"] = 6409] = "Luminance";
    InternalFormat[InternalFormat["LuminanceAlpha"] = 6410] = "LuminanceAlpha";
    InternalFormat[InternalFormat["DepthComponent"] = 6402] = "DepthComponent";
    InternalFormat[InternalFormat["DepthStencil"] = 34041] = "DepthStencil";
    InternalFormat[InternalFormat["R8"] = 33321] = "R8";
    InternalFormat[InternalFormat["R16F"] = 33325] = "R16F";
    InternalFormat[InternalFormat["R32F"] = 33326] = "R32F";
    InternalFormat[InternalFormat["R8UI"] = 33330] = "R8UI";
    InternalFormat[InternalFormat["RG8"] = 33323] = "RG8";
    InternalFormat[InternalFormat["RG16F"] = 33327] = "RG16F";
    InternalFormat[InternalFormat["RG32F"] = 33328] = "RG32F";
    InternalFormat[InternalFormat["RG8UI"] = 33336] = "RG8UI";
    InternalFormat[InternalFormat["RG16UI"] = 33338] = "RG16UI";
    InternalFormat[InternalFormat["RG32UI"] = 33340] = "RG32UI";
    InternalFormat[InternalFormat["RGB8"] = 32849] = "RGB8";
    InternalFormat[InternalFormat["SRGB8"] = 35905] = "SRGB8";
    InternalFormat[InternalFormat["RGB565"] = 36194] = "RGB565";
    InternalFormat[InternalFormat["R11F_G11F_B10F"] = 35898] = "R11F_G11F_B10F";
    InternalFormat[InternalFormat["RGB9_E5"] = 35901] = "RGB9_E5";
    InternalFormat[InternalFormat["RGB16F"] = 34843] = "RGB16F";
    InternalFormat[InternalFormat["RGB32F"] = 34837] = "RGB32F";
    InternalFormat[InternalFormat["RGB8UI"] = 36221] = "RGB8UI";
    InternalFormat[InternalFormat["RGBA8"] = 32856] = "RGBA8";
    InternalFormat[InternalFormat["SRGB8_ALPHA8"] = 35907] = "SRGB8_ALPHA8";
    InternalFormat[InternalFormat["RGB5_A1"] = 32855] = "RGB5_A1";
    InternalFormat[InternalFormat["RGB10_A2"] = 32857] = "RGB10_A2";
    InternalFormat[InternalFormat["RGBA4"] = 32854] = "RGBA4";
    InternalFormat[InternalFormat["RGBA16F"] = 34842] = "RGBA16F";
    InternalFormat[InternalFormat["RGBA32F"] = 34836] = "RGBA32F";
    InternalFormat[InternalFormat["RGBA8UI"] = 36220] = "RGBA8UI";
})(InternalFormat || (InternalFormat = {}));
export var Format;
(function (Format) {
    Format[Format["DepthComponent"] = 6402] = "DepthComponent";
    Format[Format["DepthStencil"] = 34041] = "DepthStencil";
    Format[Format["Alpha"] = 6406] = "Alpha";
    Format[Format["Red"] = 6403] = "Red";
    Format[Format["R"] = 6403] = "R";
    Format[Format["RG"] = 33319] = "RG";
    Format[Format["RGB"] = 6407] = "RGB";
    Format[Format["RGBA"] = 6408] = "RGBA";
    Format[Format["Luminance"] = 6409] = "Luminance";
    Format[Format["LuminanceAlpha"] = 6410] = "LuminanceAlpha";
    Format[Format["RedInteger"] = 36244] = "RedInteger";
    Format[Format["RInteger"] = 36244] = "RInteger";
    Format[Format["RGInteger"] = 33320] = "RGInteger";
    Format[Format["RGBInteger"] = 36248] = "RGBInteger";
    Format[Format["RGBAInteger"] = 36249] = "RGBAInteger";
})(Format || (Format = {}));
export var Type;
(function (Type) {
    Type[Type["Ubyte"] = 5121] = "Ubyte";
    Type[Type["Ushort_5_6_5"] = 33635] = "Ushort_5_6_5";
    Type[Type["Ushort_4_4_4_4"] = 32819] = "Ushort_4_4_4_4";
    Type[Type["Ushort_5_5_5_1"] = 32820] = "Ushort_5_5_5_1";
    Type[Type["Byte"] = 5120] = "Byte";
    Type[Type["Ushort"] = 5123] = "Ushort";
    Type[Type["Short"] = 5122] = "Short";
    Type[Type["Uint"] = 5125] = "Uint";
    Type[Type["Int"] = 5124] = "Int";
    Type[Type["HalfFloat"] = 5131] = "HalfFloat";
    Type[Type["Float"] = 5126] = "Float";
    Type[Type["Uint_2_10_10_10"] = 33640] = "Uint_2_10_10_10";
    Type[Type["Uint_10F_11F_11F"] = 35899] = "Uint_10F_11F_11F";
    Type[Type["UInt_24_8"] = 34042] = "UInt_24_8";
})(Type || (Type = {}));
export const pixel = (format) => {
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
