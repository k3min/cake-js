import Context from './Context';
import Texture, { TextureTarget } from './Texture';
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
