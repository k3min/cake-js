import BindableObject from '../Helpers/BindableObject';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import gl from './index';
export var TextureFormat;
(function (TextureFormat) {
    TextureFormat[TextureFormat["Alpha8"] = 0] = "Alpha8";
    TextureFormat[TextureFormat["RGB24"] = 1] = "RGB24";
    TextureFormat[TextureFormat["RGBA32"] = 2] = "RGBA32";
    TextureFormat[TextureFormat["RGB565"] = 3] = "RGB565";
    TextureFormat[TextureFormat["RGBA4444"] = 4] = "RGBA4444";
    TextureFormat[TextureFormat["RGBAFloat"] = 5] = "RGBAFloat";
})(TextureFormat || (TextureFormat = {}));
export var TextureWrap;
(function (TextureWrap) {
    TextureWrap[TextureWrap["Repeat"] = gl.REPEAT] = "Repeat";
    TextureWrap[TextureWrap["Clamp"] = gl.CLAMP_TO_EDGE] = "Clamp";
})(TextureWrap || (TextureWrap = {}));
export var TextureFilter;
(function (TextureFilter) {
    TextureFilter[TextureFilter["Nearest"] = gl.NEAREST] = "Nearest";
    TextureFilter[TextureFilter["Linear"] = gl.LINEAR] = "Linear";
    TextureFilter[TextureFilter["NearestNearest"] = gl.NEAREST_MIPMAP_NEAREST] = "NearestNearest";
    TextureFilter[TextureFilter["LinearNearest"] = gl.LINEAR_MIPMAP_NEAREST] = "LinearNearest";
    TextureFilter[TextureFilter["NearestLinear"] = gl.NEAREST_MIPMAP_LINEAR] = "NearestLinear";
    TextureFilter[TextureFilter["LinearLinear"] = gl.LINEAR_MIPMAP_LINEAR] = "LinearLinear";
})(TextureFilter || (TextureFilter = {}));
export var PixelFormat;
(function (PixelFormat) {
    PixelFormat[PixelFormat["Alpha"] = gl.ALPHA] = "Alpha";
    PixelFormat[PixelFormat["DepthComponent"] = gl.DEPTH_COMPONENT] = "DepthComponent";
    PixelFormat[PixelFormat["DepthStencil"] = gl.DEPTH_STENCIL] = "DepthStencil";
    PixelFormat[PixelFormat["Luminance"] = gl.LUMINANCE] = "Luminance";
    PixelFormat[PixelFormat["LuminanceAlpha"] = gl.LUMINANCE_ALPHA] = "LuminanceAlpha";
    PixelFormat[PixelFormat["Rgb"] = gl.RGB] = "Rgb";
    PixelFormat[PixelFormat["Rgba"] = gl.RGBA] = "Rgba";
})(PixelFormat || (PixelFormat = {}));
export var PixelInternalFormat;
(function (PixelInternalFormat) {
    PixelInternalFormat[PixelInternalFormat["Alpha"] = gl.ALPHA] = "Alpha";
    PixelInternalFormat[PixelInternalFormat["Luminance"] = gl.LUMINANCE] = "Luminance";
    PixelInternalFormat[PixelInternalFormat["LuminanceAlpha"] = gl.LUMINANCE_ALPHA] = "LuminanceAlpha";
    PixelInternalFormat[PixelInternalFormat["Rgb"] = gl.RGB] = "Rgb";
    PixelInternalFormat[PixelInternalFormat["Rgba"] = gl.RGBA] = "Rgba";
})(PixelInternalFormat || (PixelInternalFormat = {}));
export var PixelType;
(function (PixelType) {
    PixelType[PixelType["Byte"] = gl.BYTE] = "Byte";
    PixelType[PixelType["Float"] = gl.FLOAT] = "Float";
    PixelType[PixelType["Int"] = gl.INT] = "Int";
    PixelType[PixelType["Short"] = gl.SHORT] = "Short";
    PixelType[PixelType["UnsignedByte"] = gl.UNSIGNED_BYTE] = "UnsignedByte";
    PixelType[PixelType["UnsignedInt"] = gl.UNSIGNED_INT] = "UnsignedInt";
    PixelType[PixelType["UnsignedShort"] = gl.UNSIGNED_SHORT] = "UnsignedShort";
    PixelType[PixelType["UnsignedShort4444"] = gl.UNSIGNED_SHORT_4_4_4_4] = "UnsignedShort4444";
    PixelType[PixelType["UnsignedShort5551"] = gl.UNSIGNED_SHORT_5_5_5_1] = "UnsignedShort5551";
    PixelType[PixelType["UnsignedShort565"] = gl.UNSIGNED_SHORT_5_6_5] = "UnsignedShort565";
})(PixelType || (PixelType = {}));
class Texture extends BindableGraphicsObject {
    constructor(width, height, format, target, genFn, bindFn, releaseFn) {
        super(genFn, (handle) => bindFn(target, handle), releaseFn);
        this.data = null;
        this.width = width;
        this.height = height;
        this.format = format;
        this.target = target;
        this.pixelInternalFormat = Texture.getPixelInternalFormat(this.format);
        this.pixelFormat = Texture.getPixelFormat(this.format);
        this.pixelType = Texture.getPixelType(this.format);
    }
    static get bound() {
        return BindableObject.map.get('texture');
    }
    get identifier() {
        return 'texture';
    }
    static getPixelFormat(format) {
        switch (format) {
            case TextureFormat.Alpha8:
                return PixelFormat.Alpha;
            case TextureFormat.RGBA32:
            case TextureFormat.RGBA4444:
            case TextureFormat.RGBAFloat:
                return PixelFormat.Rgba;
            case TextureFormat.RGB24:
            case TextureFormat.RGB565:
                return PixelFormat.Rgb;
            default:
                throw new Error();
        }
    }
    static getPixelInternalFormat(format) {
        switch (format) {
            case TextureFormat.Alpha8:
                return PixelInternalFormat.Alpha;
            case TextureFormat.RGBA4444:
            case TextureFormat.RGBA32:
            case TextureFormat.RGBAFloat:
                return PixelInternalFormat.Rgba;
            case TextureFormat.RGB565:
            case TextureFormat.RGB24:
                return PixelInternalFormat.Rgb;
            default:
                throw new Error();
        }
    }
    static getPixelType(format) {
        switch (format) {
            case TextureFormat.Alpha8:
            case TextureFormat.RGBA32:
            case TextureFormat.RGB24:
                return PixelType.UnsignedByte;
            case TextureFormat.RGBA4444:
                return PixelType.UnsignedShort4444;
            case TextureFormat.RGB565:
                return PixelType.UnsignedShort565;
            case TextureFormat.RGBAFloat:
                return PixelType.Float;
            default:
                throw new Error();
        }
    }
}
export default Texture;
