import Context from './Context';
import Texture, { TextureTarget } from './Texture';
export var RenderBufferFormat;
(function (RenderBufferFormat) {
    RenderBufferFormat[RenderBufferFormat["RGBA4"] = 32854] = "RGBA4";
    RenderBufferFormat[RenderBufferFormat["RGB565"] = 36194] = "RGB565";
    RenderBufferFormat[RenderBufferFormat["RGB5_A1"] = 32855] = "RGB5_A1";
    RenderBufferFormat[RenderBufferFormat["DEPTH_COMPONENT16"] = 33189] = "DEPTH_COMPONENT16";
    RenderBufferFormat[RenderBufferFormat["STENCIL_INDEX8"] = 36168] = "STENCIL_INDEX8";
    RenderBufferFormat[RenderBufferFormat["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
    RenderBufferFormat[RenderBufferFormat["R8"] = 33321] = "R8";
    RenderBufferFormat[RenderBufferFormat["R8UI"] = 33330] = "R8UI";
    RenderBufferFormat[RenderBufferFormat["R8I"] = 33329] = "R8I";
    RenderBufferFormat[RenderBufferFormat["R16UI"] = 33332] = "R16UI";
    RenderBufferFormat[RenderBufferFormat["R16I"] = 33331] = "R16I";
    RenderBufferFormat[RenderBufferFormat["R32UI"] = 33334] = "R32UI";
    RenderBufferFormat[RenderBufferFormat["R32I"] = 33333] = "R32I";
    RenderBufferFormat[RenderBufferFormat["RG8"] = 33323] = "RG8";
    RenderBufferFormat[RenderBufferFormat["RG8UI"] = 33336] = "RG8UI";
    RenderBufferFormat[RenderBufferFormat["RG8I"] = 33335] = "RG8I";
    RenderBufferFormat[RenderBufferFormat["RG16UI"] = 33338] = "RG16UI";
    RenderBufferFormat[RenderBufferFormat["RG16I"] = 33337] = "RG16I";
    RenderBufferFormat[RenderBufferFormat["RG32UI"] = 33340] = "RG32UI";
    RenderBufferFormat[RenderBufferFormat["RG32I"] = 33339] = "RG32I";
    RenderBufferFormat[RenderBufferFormat["RGB8"] = 32849] = "RGB8";
    RenderBufferFormat[RenderBufferFormat["RGBA8"] = 32856] = "RGBA8";
    RenderBufferFormat[RenderBufferFormat["RGB10_A2"] = 32857] = "RGB10_A2";
    RenderBufferFormat[RenderBufferFormat["RGBA8UI"] = 36220] = "RGBA8UI";
    RenderBufferFormat[RenderBufferFormat["RGBA8I"] = 36238] = "RGBA8I";
    RenderBufferFormat[RenderBufferFormat["RGB10_A2UI"] = 36975] = "RGB10_A2UI";
    RenderBufferFormat[RenderBufferFormat["RGBA16UI"] = 36214] = "RGBA16UI";
    RenderBufferFormat[RenderBufferFormat["RGBA16I"] = 36232] = "RGBA16I";
    RenderBufferFormat[RenderBufferFormat["RGBA32I"] = 36226] = "RGBA32I";
    RenderBufferFormat[RenderBufferFormat["RGBA32UI"] = 36208] = "RGBA32UI";
    RenderBufferFormat[RenderBufferFormat["DEPTH_COMPONENT24"] = 33190] = "DEPTH_COMPONENT24";
    RenderBufferFormat[RenderBufferFormat["DEPTH_COMPONENT32F"] = 36012] = "DEPTH_COMPONENT32F";
    RenderBufferFormat[RenderBufferFormat["DEPTH24_STENCIL8"] = 35056] = "DEPTH24_STENCIL8";
    RenderBufferFormat[RenderBufferFormat["DEPTH32F_STENCIL8"] = 36013] = "DEPTH32F_STENCIL8";
    RenderBufferFormat[RenderBufferFormat["R16F"] = 33325] = "R16F";
    RenderBufferFormat[RenderBufferFormat["RG16F"] = 33327] = "RG16F";
    RenderBufferFormat[RenderBufferFormat["RGBA16F"] = 34842] = "RGBA16F";
    RenderBufferFormat[RenderBufferFormat["R32F"] = 33326] = "R32F";
    RenderBufferFormat[RenderBufferFormat["RG32F"] = 33328] = "RG32F";
    RenderBufferFormat[RenderBufferFormat["RGBA32F"] = 34836] = "RGBA32F";
    RenderBufferFormat[RenderBufferFormat["R11F_G11F_B10F"] = 35898] = "R11F_G11F_B10F";
})(RenderBufferFormat || (RenderBufferFormat = {}));
class RenderBuffer extends Texture {
    constructor(width, height, format) {
        super(width, height, format, TextureTarget.RenderBuffer, () => Context.createRenderbuffer(), (handle) => Context.bindRenderbuffer(TextureTarget.RenderBuffer, handle), (handle) => Context.deleteRenderbuffer(handle));
        this.name = 'RenderBuffer';
    }
    get identifier() {
        return 'RenderBuffer';
    }
    apply() {
        this.bind();
        Context.renderbufferStorage(this.target, this.format, this.width, this.height);
    }
}
export default RenderBuffer;
