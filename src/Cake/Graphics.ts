import { Disposable } from '../Core';
import Context, { Texture } from '../GL';
import FrameBuffer from '../GL/FrameBuffer';
import { isArrayLike, Null } from '../Core/Helpers';
import Material from './Material';
import Quad from './Quad';

class Graphics implements Disposable {
	private disposed: boolean = false;
	public readonly framebuffer: FrameBuffer = new FrameBuffer();
	public readonly quad: Quad = new Quad();

	public dispose(): void {
		if (this.disposed) {
			throw new ReferenceError(`Graphics: already disposed`);
		}

		this.framebuffer.dispose();
		this.quad.dispose();

		this.disposed = true;
	}

	public setRenderTarget(color: Null<Texture | ArrayLike<Texture>> = null, depth: Null<Texture> = null): void {
		if (color === null) {
			this.framebuffer.unbind();
			return;
		}

		this.framebuffer.bind();

		if (depth === null) {
			if (isArrayLike(color)) {
				const buffers: ArrayLike<Texture> = color as ArrayLike<Texture>;
				Context.viewport(0, 0, buffers[0].width, buffers[0].height);
			} else {
				const buffer: Texture = color as Texture;
				Context.viewport(0, 0, buffer.width, buffer.height);
			}
		} else {
			Context.viewport(0, 0, depth.width, depth.height);
		}

		if (this.framebuffer.color === color && this.framebuffer.depth === depth) {
			return;
		}

		this.framebuffer.color = color;
		this.framebuffer.depth = depth;

		this.framebuffer.apply(false);
	}

	public blit(a: Null<Texture>, b: Null<Texture>, material: Material): void {
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