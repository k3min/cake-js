import gl from './index';
import Texture from './Texture';
class RenderBuffer extends Texture {
    constructor(width, height, format, stencil) {
        super(width, height, format, gl.RENDERBUFFER, () => gl.createRenderbuffer(), (handle) => gl.bindRenderbuffer(gl.RENDERBUFFER, handle), (handle) => gl.deleteRenderbuffer(handle));
        this.name = 'RenderBuffer';
        this.stencil = stencil;
    }
    get identifier() {
        return 'renderbuffer';
    }
    apply() {
        this.bind();
        gl.renderbufferStorage(this.target, this.format, this.width, this.height);
    }
}
export default RenderBuffer;
