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
class Texture extends BindableGraphicsObject {
    constructor(width, height, format, target, genFn, bindFn, releaseFn) {
        super(genFn, (handle) => bindFn(target, handle), releaseFn);
        this.name = 'Texture';
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
        return BindableGraphicsObject.map.get('texture');
    }
    get identifier() {
        return 'texture';
    }
    static getPixelFormat(format) {
        switch (format) {
            case TextureFormat.Alpha8:
                return gl.ALPHA;
            case TextureFormat.RGBA32:
            case TextureFormat.RGBA4444:
            case TextureFormat.RGBAFloat:
                return gl.RGBA;
            case TextureFormat.RGB24:
            case TextureFormat.RGB565:
                return gl.RGB;
            default:
                throw new RangeError();
        }
    }
    static getPixelInternalFormat(format) {
        switch (format) {
            case TextureFormat.Alpha8:
                return gl.ALPHA;
            case TextureFormat.RGBA4444:
            case TextureFormat.RGBA32:
            case TextureFormat.RGBAFloat:
                return gl.RGBA;
            case TextureFormat.RGB565:
            case TextureFormat.RGB24:
                return gl.RGB;
            default:
                throw new RangeError();
        }
    }
    static getPixelType(format) {
        switch (format) {
            case TextureFormat.Alpha8:
            case TextureFormat.RGBA32:
            case TextureFormat.RGB24:
                return gl.UNSIGNED_BYTE;
            case TextureFormat.RGBA4444:
                return gl.UNSIGNED_SHORT_4_4_4_4;
            case TextureFormat.RGB565:
                return gl.UNSIGNED_SHORT_5_6_5;
            case TextureFormat.RGBAFloat:
                return gl.FLOAT;
            default:
                throw new RangeError();
        }
    }
}
export default Texture;
