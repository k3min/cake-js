import { BindableGraphicsObject } from './Helpers';
import GL from './GL';
export var TextureFormat;
(function (TextureFormat) {
    TextureFormat[TextureFormat["Alpha8"] = 0] = "Alpha8";
    TextureFormat[TextureFormat["RGB24"] = 1] = "RGB24";
    TextureFormat[TextureFormat["RGBA32"] = 2] = "RGBA32";
    TextureFormat[TextureFormat["R5G6B5"] = 3] = "R5G6B5";
    TextureFormat[TextureFormat["RGBA16"] = 4] = "RGBA16";
    TextureFormat[TextureFormat["RGBAFloat"] = 5] = "RGBAFloat";
})(TextureFormat || (TextureFormat = {}));
export var PixelFormat;
(function (PixelFormat) {
    PixelFormat[PixelFormat["Alpha"] = 6406] = "Alpha";
    PixelFormat[PixelFormat["RGB"] = 6407] = "RGB";
    PixelFormat[PixelFormat["RGBA"] = 6408] = "RGBA";
})(PixelFormat || (PixelFormat = {}));
export var PixelType;
(function (PixelType) {
    PixelType[PixelType["Uint8"] = 5121] = "Uint8";
    PixelType[PixelType["Float32"] = 5126] = "Float32";
    PixelType[PixelType["Uint16"] = 32819] = "Uint16";
    PixelType[PixelType["Uint565"] = 33635] = "Uint565";
})(PixelType || (PixelType = {}));
export var TextureTarget;
(function (TextureTarget) {
    TextureTarget[TextureTarget["Texture2D"] = 3553] = "Texture2D";
    TextureTarget[TextureTarget["CubeMap"] = 34067] = "CubeMap";
    TextureTarget[TextureTarget["RenderBuffer"] = 36161] = "RenderBuffer";
})(TextureTarget || (TextureTarget = {}));
class Texture extends BindableGraphicsObject {
    constructor(width, height, format, target, genFn, bindFn, releaseFn) {
        super(genFn, bindFn, releaseFn);
        this.name = 'Texture';
        this.parameters = {};
        this.data = null;
        this.width = width;
        this.height = height;
        this.format = format;
        this.target = target;
        this.pixelFormat = Texture.getPixelFormat(this.format);
        this.pixelType = Texture.getPixelType(this.format);
    }
    get identifier() {
        return 'Texture';
    }
    set(name, value) {
        if (this.parameters[name] === value) {
            return;
        }
        this.parameters[name] = value;
        GL.texParameteri(this.target, name, value);
    }
    static getPixelFormat(format) {
        switch (format) {
            case TextureFormat.Alpha8:
                return PixelFormat.Alpha;
            case TextureFormat.RGBA32:
            case TextureFormat.RGBA16:
            case TextureFormat.RGBAFloat:
                return PixelFormat.RGBA;
            case TextureFormat.RGB24:
            case TextureFormat.R5G6B5:
                return PixelFormat.RGB;
            default:
                throw new RangeError();
        }
    }
    static getPixelType(format) {
        switch (format) {
            case TextureFormat.Alpha8:
            case TextureFormat.RGBA32:
            case TextureFormat.RGB24:
                return PixelType.Uint8;
            case TextureFormat.RGBA16:
                return PixelType.Uint16;
            case TextureFormat.R5G6B5:
                return PixelType.Uint565;
            case TextureFormat.RGBAFloat:
                return PixelType.Float32;
            default:
                throw new RangeError();
        }
    }
}
export default Texture;
