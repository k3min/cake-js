import Framebuffer from './GL/Framebuffer';
import { gl } from './index';
import Quad from './Quad';
import Material from './Material';
import Shader from './Shader';
class Graphics {
    async init(shader = 'shaders/copy.glsl') {
        this.framebuffer = new Framebuffer();
        this.quad = new Quad();
        this.copy = new Material(await Shader.load(shader));
    }
    dispose() {
        if (this.framebuffer !== undefined) {
            this.framebuffer.dispose();
            this.framebuffer = undefined;
        }
        if (this.quad !== undefined) {
            this.quad.dispose();
            this.quad = undefined;
        }
        if (this.copy !== undefined) {
            this.copy.dispose();
            this.copy = undefined;
        }
    }
    setRenderTarget(color, depth) {
        if (this.framebuffer === undefined) {
            throw new ReferenceError(`Graphics uninitialized ('framebuffer' is undefined)`);
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
            throw new ReferenceError(`Graphics uninitialized ('quad' is undefined)`);
        }
        if (material === undefined) {
            if (this.copy === undefined) {
                throw new ReferenceError(`Graphics uninitialized ('copy' is undefined)`);
            }
            material = this.copy;
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
