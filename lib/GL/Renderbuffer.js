import BindableObject from '../Helpers/BindableObject';
import { FramebufferTarget } from './Framebuffer';
import gl from './index';
import Texture from './Texture';
class Renderbuffer extends Texture {
    constructor(width, height, format, stencil) {
        super(width, height, format, FramebufferTarget.Renderbuffer, gl.createRenderbuffer, gl.bindRenderbuffer, gl.deleteRenderbuffer);
        this.name = 'Renderbuffer';
        this.stencil = stencil;
    }
    static get bound() {
        return BindableObject.map.get('renderbuffer');
    }
    get identifier() {
        return 'renderbuffer';
    }
    apply() {
        this.bind();
        gl.renderbufferStorage(FramebufferTarget.Renderbuffer, this.format, this.width, this.height);
    }
}
export default Renderbuffer;
