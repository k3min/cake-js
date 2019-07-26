import { Disposable } from '../Core';
import GL, { Texture } from '../GL';
import FrameBuffer from '../GL/FrameBuffer';
import { Null } from '../Core/Helpers';
import Material from './Material';
import Quad from './Quad';

class Graphics implements Disposable {
	private disposed: boolean = false;
	public readonly framebuffer: FrameBuffer = new FrameBuffer();
	public readonly quad: Quad = new Quad();

	public dispose(): boolean {
		if (this.disposed) {
			return false;
		}

		this.framebuffer.dispose();
		this.quad.dispose();

		this.disposed = true;

		return true;
	}

	public setRenderTarget(color: Null<Texture | Texture[]> = null, depth: Null<Texture> = null): void {
		if (!color) {
			this.framebuffer.unbind();
			return;
		}

		this.framebuffer.bind();

		if (color instanceof Array) {
			GL.viewport(0, 0, (color as Texture[])[0].width, (color as Texture[])[0].height);
		} else {
			GL.viewport(0, 0, (color as Texture).width, (color as Texture).height);
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

	public blit(a: Null<Texture>, b: Null<Texture | Texture[]>, material: Material): void {
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