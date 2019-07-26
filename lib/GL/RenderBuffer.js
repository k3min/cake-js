import GL from './GL';
import Texture, { TextureTarget } from './Texture';
export var RenderBufferFormat;
(function (RenderBufferFormat) {
    RenderBufferFormat[RenderBufferFormat["RGBA32"] = 32854] = "RGBA32";
    RenderBufferFormat[RenderBufferFormat["R5G5B5A1"] = 32855] = "R5G5B5A1";
    RenderBufferFormat[RenderBufferFormat["R5G6B5"] = 36194] = "R5G6B5";
    RenderBufferFormat[RenderBufferFormat["Depth"] = 33189] = "Depth";
    RenderBufferFormat[RenderBufferFormat["Stencil"] = 36168] = "Stencil";
    RenderBufferFormat[RenderBufferFormat["DepthStencil"] = 34041] = "DepthStencil";
})(RenderBufferFormat || (RenderBufferFormat = {}));
class RenderBuffer extends Texture {
    constructor(width, height, format) {
        super(width, height, format, TextureTarget.RenderBuffer, () => GL.createRenderbuffer(), (handle) => GL.bindRenderbuffer(TextureTarget.RenderBuffer, handle), (handle) => GL.deleteRenderbuffer(handle));
        this.name = 'RenderBuffer';
    }
    get identifier() {
        return 'RenderBuffer';
    }
    apply() {
        this.bind();
        GL.renderbufferStorage(this.target, this.format, this.width, this.height);
    }
}
export default RenderBuffer;
