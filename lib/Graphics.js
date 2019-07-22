import Framebuffer from './GL/Framebuffer';
import { gl } from './index';
import Quad from './Quad';
class Graphics {
    dispose() {
        if (this.framebuffer !== undefined) {
            this.framebuffer.dispose();
            this.framebuffer = undefined;
        }
        if (this.quad !== undefined) {
            this.quad.dispose();
            this.quad = undefined;
        }
    }
    setRenderTarget(color, depth) {
        if (this.framebuffer === undefined) {
            this.framebuffer = new Framebuffer();
        }
        if (color === undefined) {
            this.framebuffer.unbind();
            return;
        }
        this.framebuffer.bind();
        if (this.framebuffer.color === color && this.framebuffer.depth === depth) {
            return;
        }
        this.framebuffer.detach(gl.COLOR_ATTACHMENT0);
        this.framebuffer.color = color;
        this.framebuffer.depth = depth;
        this.framebuffer.apply(true);
    }
    blit(a, b, material) {
        if (this.quad === undefined) {
            this.quad = new Quad();
        }
        this.setRenderTarget(b);
        if (b !== undefined) {
            gl.viewport(0, 0, b.width, b.height);
        }
        if (a !== undefined) {
            material.setTexture('_MainTex', a);
        }
        material.use();
        this.quad.draw();
    }
}
let graphics = new Graphics();
export default graphics;
