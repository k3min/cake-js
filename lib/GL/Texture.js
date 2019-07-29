import Context from './Context';
import { BindableGraphicsObject, pixelFormat, pixelType } from './Helpers';
import TextureFilterMode from './Helpers/TextureFilterMode';
import TextureWrapMode from './Helpers/TextureWrapMode';
export var TextureFormat;
(function (TextureFormat) {
    TextureFormat[TextureFormat["Alpha8"] = 0] = "Alpha8";
    TextureFormat[TextureFormat["RGB24"] = 1] = "RGB24";
    TextureFormat[TextureFormat["RGBA32"] = 2] = "RGBA32";
    TextureFormat[TextureFormat["R5G6B5"] = 3] = "R5G6B5";
    TextureFormat[TextureFormat["R5G5B5A1"] = 4] = "R5G5B5A1";
    TextureFormat[TextureFormat["RGBA16"] = 5] = "RGBA16";
    TextureFormat[TextureFormat["RGBAFloat"] = 6] = "RGBAFloat";
    TextureFormat[TextureFormat["RGBAHalf"] = 7] = "RGBAHalf";
    TextureFormat[TextureFormat["Depth"] = 8] = "Depth";
    TextureFormat[TextureFormat["Depth16"] = 9] = "Depth16";
    TextureFormat[TextureFormat["Depth32"] = 10] = "Depth32";
    TextureFormat[TextureFormat["Stencil"] = 11] = "Stencil";
    TextureFormat[TextureFormat["DepthStencil"] = 12] = "DepthStencil";
})(TextureFormat || (TextureFormat = {}));
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
        this.filterMode = TextureFilterMode.Bilinear;
        this.wrapMode = TextureWrapMode.Clamp;
        this.mipmapCount = 0;
        this.width = width;
        this.height = height;
        this.format = format;
        this.target = target;
        this.pixelFormat = pixelFormat(format);
        this.pixelType = pixelType(format);
    }
    get identifier() {
        return 'Texture';
    }
    set(name, value) {
        if (this.parameters[name] === value) {
            return;
        }
        this.parameters[name] = value;
        Context.texParameteri(this.target, name, value);
    }
    setWrapMode() {
        switch (this.wrapMode) {
            case TextureWrapMode.Clamp:
                this.set(Context.TEXTURE_WRAP_S, Context.CLAMP_TO_EDGE);
                this.set(Context.TEXTURE_WRAP_T, Context.CLAMP_TO_EDGE);
                break;
            case TextureWrapMode.Repeat:
                this.set(Context.TEXTURE_WRAP_S, Context.REPEAT);
                this.set(Context.TEXTURE_WRAP_T, Context.REPEAT);
                break;
            case TextureWrapMode.Mirror:
                this.set(Context.TEXTURE_WRAP_S, Context.MIRRORED_REPEAT);
                this.set(Context.TEXTURE_WRAP_T, Context.MIRRORED_REPEAT);
                break;
        }
    }
    setFilterMode() {
        switch (this.filterMode) {
            case TextureFilterMode.Point:
                this.set(Context.TEXTURE_MAG_FILTER, Context.NEAREST);
                this.set(Context.TEXTURE_MIN_FILTER, this.mipmapCount ? Context.NEAREST_MIPMAP_NEAREST : Context.NEAREST);
                break;
            case TextureFilterMode.Bilinear:
                this.set(Context.TEXTURE_MAG_FILTER, Context.LINEAR);
                this.set(Context.TEXTURE_MIN_FILTER, this.mipmapCount ? Context.LINEAR_MIPMAP_NEAREST : Context.LINEAR);
                break;
            case TextureFilterMode.Trilinear:
                this.set(Context.TEXTURE_MAG_FILTER, Context.LINEAR);
                this.set(Context.TEXTURE_MIN_FILTER, Context.LINEAR_MIPMAP_LINEAR);
                break;
        }
    }
    apply() {
        this.bind();
        this.setWrapMode();
        this.setFilterMode();
    }
}
export default Texture;
