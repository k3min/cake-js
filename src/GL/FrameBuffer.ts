import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import gl from './index';
import Texture from './Texture';
import Texture2D from './Texture2D';
import RenderBuffer from './RenderBuffer';

class FrameBuffer extends BindableGraphicsObject<FrameBuffer, WebGLFramebuffer> {
	public name: string = 'FrameBuffer';

	public readonly attachments: Map<GLenum, Texture> = new Map<GLenum, Texture>();

	public color: Null<Texture2D> = null;
	public depth: Null<RenderBuffer> = null;

	public static get bound(): Null<FrameBuffer> {
		return BindableGraphicsObject.map.get('framebuffer') as Null<FrameBuffer>;
	}

	protected get identifier(): string {
		return 'framebuffer';
	}

	public constructor() {
		super(() => gl.createFramebuffer(), (handle) => gl.bindFramebuffer(gl.FRAMEBUFFER, handle), (handle) => gl.deleteFramebuffer(handle));

		if (this.color || this.depth) {
			this.apply();
		}
	}

	public apply(force: boolean = false): void {
		this.bind();

		if (this.depth) {
			this.attach(this.depth.stencil ? gl.DEPTH_STENCIL_ATTACHMENT : gl.DEPTH_ATTACHMENT, this.depth);
		}

		if (this.color) {
			this.attach(gl.COLOR_ATTACHMENT0, this.color);
		}

		if (!force && gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
			this.dispose();

			throw new Error('FrameBuffer not complete');
		}
	}

	private attachAttachment(slot: GLenum, target: GLenum, handle: Null<WebGLObject>): void {
		this.bind();

		switch (target) {
			case gl.TEXTURE_2D:
				gl.framebufferTexture2D(gl.FRAMEBUFFER, slot, target, handle, 0);
				break;

			case gl.RENDERBUFFER:
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, slot, target, handle);
				break;

			default:
				throw new TypeError('Target not valid!');
		}
	}

	private detachAttachment(slot: GLenum, target: GLenum): void {
		this.bind();

		this.attachAttachment(slot, target, null);

		this.attachments.delete(slot);
	}

	public attach(slot: GLenum, texture: Texture): void {
		if (this.attachments.get(slot) === texture) {
			return;
		}

		this.attachAttachment(slot, texture.target, texture.handle);

		this.attachments.set(slot, texture);
	}

	public detach(slot?: GLenum): void {
		if (!slot) {
			this.attachments.forEach((texture, slot) => this.detachAttachment(slot, texture.target));
			return;
		}

		const texture = this.attachments.get(slot);

		if (!texture) {
			return;
		}

		this.attachAttachment(slot, texture.target, null);

		this.attachments.delete(slot);
	}

	public dispose(): void {
		this.detach();
		super.dispose();
	}
}

export default FrameBuffer;