import FrameBuffer from './GL/FrameBuffer';
import { gl } from './index';
import Quad from './Quad';
class Graphics {
    constructor() {
        this.framebuffer = null;
        this.quad = null;
    }
    dispose() {
        if (this.framebuffer) {
            this.framebuffer.dispose();
            this.framebuffer = null;
        }
        if (this.quad) {
            this.quad.dispose();
            this.quad = null;
        }
    }
    setRenderTarget(color, depth) {
        if (!this.framebuffer) {
            this.framebuffer = new FrameBuffer();
        }
        if (!color) {
            this.framebuffer.unbind();
            return;
        }
        this.framebuffer.bind();
        if (this.framebuffer.color === color && this.framebuffer.depth === depth) {
            return;
        }
        this.framebuffer.detach(gl.COLOR_ATTACHMENT0);
        this.framebuffer.color = color;
        this.framebuffer.depth = depth || null;
        this.framebuffer.apply();
    }
    blit(a, b, material) {
        if (!this.quad) {
            this.quad = new Quad();
        }
        this.setRenderTarget(b);
        if (b) {
            gl.viewport(0, 0, b.width, b.height);
        }
        if (a) {
            material.setTexture('_MainTex', a);
        }
        material.use();
        this.quad.draw();
    }
}
let graphics = new Graphics();
export default graphics;
