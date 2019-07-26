import GL from '../GL';
import FrameBuffer from '../GL/FrameBuffer';
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
        if (color instanceof Array) {
            GL.viewport(0, 0, color[0].width, color[0].height);
        }
        else {
            GL.viewport(0, 0, color.width, color.height);
        }
        if (this.framebuffer.color !== color || this.framebuffer.depth !== depth) {
            this.framebuffer.attachments.forEach((_, slot) => {
                this.framebuffer.detach(slot);
            });
            this.framebuffer.color = color;
            this.framebuffer.depth = depth;
            this.framebuffer.apply(false);
        }
    }
    blit(a, b, material) {
        this.setRenderTarget(b);
        if (!b) {
            GL.viewport(0, 0, GL.canvas.width, GL.canvas.height);
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
