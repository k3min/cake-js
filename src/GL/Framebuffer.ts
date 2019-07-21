import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import gl from './index';
import Texture from './Texture';
import Texture2D from './Texture2D';
import Renderbuffer from './Renderbuffer';

class Framebuffer extends BindableGraphicsObject<Framebuffer, WebGLFramebuffer> {
	public name: string = 'Framebuffer';

	public readonly attachments: Map<GLenum, Texture> = new Map<GLenum, Texture>();

	public color?: Texture2D;
	public depth?: Renderbuffer;

	public static get bound(): Null<Framebuffer> {
		return BindableGraphicsObject.map.get('framebuffer') as Null<Framebuffer>;
	}

	protected get identifier(): string {
		return 'framebuffer';
	}

	public constructor() {
		super(() => gl.createFramebuffer(), (handle) => gl.bindFramebuffer(gl.FRAMEBUFFER, handle), (handle) => gl.deleteFramebuffer(handle));

		if (this.color || this.depth) {
			this.apply();
			this.unbind();
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

			throw new Error('Framebuffer not complete');
		}
	}

	private attachAttachment(slot: GLenum, target: GLenum, handle: WebGLObject | null): void {
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
		if (slot === undefined) {
			this.attachments.forEach((texture, slot) => this.detachAttachment(slot, texture.target));
			return;
		}

		const texture = this.attachments.get(slot);

		if (texture === undefined) {
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

export default Framebuffer;