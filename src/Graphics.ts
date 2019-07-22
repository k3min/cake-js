import Framebuffer from './GL/Framebuffer';
import Disposable from './Helpers/Disposable';
import { gl } from './index';
import Quad from './Quad';
import Material from './Material';
import Texture2D from './GL/Texture2D';
import Renderbuffer from './GL/Renderbuffer';

class Graphics implements Disposable {
	private framebuffer?: Framebuffer;

	public quad?: Quad;

	public dispose(): void {
		if (this.framebuffer !== undefined) {
			this.framebuffer.dispose();
			this.framebuffer = undefined;
		}

		if (this.quad !== undefined) {
			this.quad.dispose();
			this.quad = undefined;
		}
	}

	public setRenderTarget(color?: Texture2D, depth?: Renderbuffer): void {
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

	public blit(a: Texture2D, b: Texture2D, material: Material): void {
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

let graphics: Graphics = new Graphics();

export default graphics;