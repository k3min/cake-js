import GL, { FrameBuffer, FrameBufferAttachment } from '../GL';
import Quad from './Quad';
class Graphics {
    constructor() {
        this.disposed = false;
        this.framebuffer = new FrameBuffer();
        this.quad = new Quad();
    }
    dispose() {
        if (this.disposed) {
            return false;
        }
        this.framebuffer.dispose();
        this.quad.dispose();
        this.disposed = true;
        return true;
    }
    setRenderTarget(color = null, depth = null) {
        if (!color) {
            this.framebuffer.unbind();
            return;
        }
        this.framebuffer.bind();
        if (this.framebuffer.color === color && this.framebuffer.depth === depth) {
            return;
        }
        this.framebuffer.detach(FrameBufferAttachment.Color);
        this.framebuffer.color = color;
        this.framebuffer.depth = depth || null;
        this.framebuffer.apply(false);
    }
    blit(a, b, material) {
        this.setRenderTarget(b);
        if (b) {
            GL.viewport(0, 0, b.width, b.height);
        }
        if (a) {
            material.setTexture('_MainTex', a);
        }
        material.use();
        this.quad.draw();
    }
}
const graphics = new Graphics();
export default graphics;
