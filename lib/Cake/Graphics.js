import Context from '../GL';
import FrameBuffer from '../GL/FrameBuffer';
import { isArrayLike } from '../Core/Helpers';
import Quad from './Quad';
class Graphics {
    constructor() {
        this.disposed = false;
        this.framebuffer = new FrameBuffer();
        this.quad = new Quad();
    }
    dispose() {
        if (this.disposed) {
            throw new ReferenceError(`Graphics: already disposed`);
        }
        this.framebuffer.dispose();
        this.quad.dispose();
        this.disposed = true;
    }
    setRenderTarget(color = null, depth = null) {
        if (color === null) {
            this.framebuffer.unbind();
            return;
        }
        this.framebuffer.bind();
        if (depth === null) {
            if (isArrayLike(color)) {
                const buffers = color;
                Context.viewport(0, 0, buffers[0].width, buffers[0].height);
            }
            else {
                const buffer = color;
                Context.viewport(0, 0, buffer.width, buffer.height);
            }
        }
        else {
            Context.viewport(0, 0, depth.width, depth.height);
        }
        if (this.framebuffer.color === color && this.framebuffer.depth === depth) {
            return;
        }
        this.framebuffer.color = color;
        this.framebuffer.depth = depth;
        this.framebuffer.apply(false);
    }
    blit(a, b, material) {
        this.setRenderTarget(b);
        if (b === null) {
            Context.viewport(0, 0, Context.canvas.width, Context.canvas.height);
        }
        if (a !== null) {
            material.setTexture('_MainTex', a);
        }
        material.use();
        this.quad.draw();
    }
}
const graphics = new Graphics();
export default graphics;
