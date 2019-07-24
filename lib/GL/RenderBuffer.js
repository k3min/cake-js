import GL from './GL';
import Texture, { TextureTarget } from './Texture';
class RenderBuffer extends Texture {
    constructor(width, height, format, stencil) {
        super(width, height, format, TextureTarget.RenderBuffer, () => GL.createRenderbuffer(), (handle) => GL.bindRenderbuffer(TextureTarget.RenderBuffer, handle), (handle) => GL.deleteRenderbuffer(handle));
        this.name = 'RenderBuffer';
        this.stencil = stencil;
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
