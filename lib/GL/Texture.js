import { Vector4 } from '../Math';
import Context from './Context';
import { BindableGraphicsObject, pixel } from './Helpers';
import TextureFilterMode from './Helpers/TextureFilterMode';
import TextureWrapMode from './Helpers/TextureWrapMode';
export var TextureFormat;
(function (TextureFormat) {
    TextureFormat[TextureFormat["ARGB32"] = 0] = "ARGB32";
    TextureFormat[TextureFormat["Depth"] = 1] = "Depth";
    TextureFormat[TextureFormat["ARGBHalf"] = 2] = "ARGBHalf";
    TextureFormat[TextureFormat["RGB565"] = 3] = "RGB565";
    TextureFormat[TextureFormat["ARGB4444"] = 4] = "ARGB4444";
    TextureFormat[TextureFormat["ARGB1555"] = 5] = "ARGB1555";
    TextureFormat[TextureFormat["ARGB2101010"] = 6] = "ARGB2101010";
    //ARGB64,
    TextureFormat[TextureFormat["ARGBFloat"] = 7] = "ARGBFloat";
    TextureFormat[TextureFormat["RGFloat"] = 8] = "RGFloat";
    TextureFormat[TextureFormat["RGHalf"] = 9] = "RGHalf";
    TextureFormat[TextureFormat["RFloat"] = 10] = "RFloat";
    TextureFormat[TextureFormat["RHalf"] = 11] = "RHalf";
    TextureFormat[TextureFormat["R8"] = 12] = "R8";
    //ARGBInt,
    //RGInt,
    //RInt,
    //BGRA32,
    TextureFormat[TextureFormat["RGB111110Float"] = 13] = "RGB111110Float";
    //RG32,
    //RGBAUShort,
    TextureFormat[TextureFormat["RG16"] = 14] = "RG16";
    //R16
})(TextureFormat || (TextureFormat = {}));
export var TextureTarget;
(function (TextureTarget) {
    TextureTarget[TextureTarget["Texture2D"] = 3553] = "Texture2D";
    TextureTarget[TextureTarget["Texture2DArray"] = 35866] = "Texture2DArray";
    TextureTarget[TextureTarget["CubeMap"] = 34067] = "CubeMap";
    TextureTarget[TextureTarget["RenderBuffer"] = 36161] = "RenderBuffer";
})(TextureTarget || (TextureTarget = {}));
/**
 * @todo Implement observable pattern
 */
class Texture extends BindableGraphicsObject {
    constructor(width, height, format, target, genFn, bindFn, releaseFn) {
        super(genFn, bindFn, releaseFn);
        this.name = 'Texture';
        this.parameters = {};
        this.data = null;
        this.filterMode = TextureFilterMode.Bilinear;
        this.wrapMode = TextureWrapMode.Clamp;
        this.mipmapCount = 0;
        this.texelSize = new Vector4(0, 0, 0, 0);
        this.width = width;
        this.height = height;
        this.format = format;
        this.target = target;
        this.pixel = {
            ...pixel(format),
        };
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
        this.texelSize[0] = 1 / this.width;
        this.texelSize[1] = 1 / this.height;
        this.texelSize[2] = this.width;
        this.texelSize[3] = this.height;
    }
}
export default Texture;
