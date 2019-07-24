import GL from '../GL';
import FrameBuffer, { FrameBufferAttachment } from '../GL/FrameBuffer';
import RenderBuffer from '../GL/RenderBuffer';
import Texture2D from '../GL/Texture2D';
import Disposable from '../Helpers/Disposable';
import Null from '../Helpers/Null';
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

	public setRenderTarget(color: Null<Texture2D> = null, depth: Null<RenderBuffer> = null): void {
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

	public blit(a: Null<Texture2D>, b: Null<Texture2D>, material: Material): void {
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