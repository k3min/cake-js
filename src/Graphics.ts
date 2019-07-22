import Framebuffer from './GL/Framebuffer';
import Disposable from './Helpers/Disposable';
import Null from './Helpers/Null';
import { gl } from './index';
import Quad from './Quad';
import Material from './Material';
import Texture2D from './GL/Texture2D';
import Renderbuffer from './GL/Renderbuffer';

class Graphics implements Disposable {
	private framebuffer: Null<Framebuffer> = null;

	public quad: Null<Quad> = null;

	public dispose(): void {
		if (this.framebuffer) {
			this.framebuffer.dispose();
			this.framebuffer = null;
		}

		if (this.quad) {
			this.quad.dispose();
			this.quad = null;
		}
	}

	public setRenderTarget(color?: Null<Texture2D>, depth?: Null<Renderbuffer>): void {
		if (!this.framebuffer) {
			this.framebuffer = new Framebuffer();
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

		this.framebuffer.apply(true);
	}

	public blit(a: Null<Texture2D>, b: Null<Texture2D>, material: Material): void {
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

let graphics: Graphics = new Graphics();

export default graphics;