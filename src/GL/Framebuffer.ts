import BindableObject from '../Helpers/BindableObject';
import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import FramebufferTarget from './Helpers/FramebufferTarget';
import gl from './index';
import Texture from './Texture';
import Texture2D from './Texture2D';
import Renderbuffer from './Renderbuffer';

export enum FramebufferAttachment {
	DepthStencil = gl.DEPTH_STENCIL_ATTACHMENT,
	Depth = gl.DEPTH_ATTACHMENT,
	Color = gl.COLOR_ATTACHMENT0,
}

class Framebuffer extends BindableGraphicsObject<Framebuffer, WebGLFramebuffer> {
	public name: string = 'Framebuffer';

	public readonly attachments: Map<FramebufferAttachment, Texture> = new Map<FramebufferAttachment, Texture>();

	public color?: Texture2D;
	public depth?: Renderbuffer;

	public static get bound(): Null<Framebuffer> {
		return BindableObject.map.get('framebuffer') as Null<Framebuffer>;
	}

	protected get identifier(): string {
		return 'framebuffer';
	}

	public constructor() {
		super(gl.createFramebuffer, (handle) => gl.bindFramebuffer(gl.FRAMEBUFFER, handle), gl.deleteFramebuffer);

		if (this.color || this.depth) {
			this.apply();
			this.unbind();
		}
	}

	public apply(force: boolean = false): void {
		this.bind();

		if (this.depth) {
			this.attach(this.depth.stencil ? FramebufferAttachment.DepthStencil : FramebufferAttachment.Depth, this.depth);
		}

		if (this.color) {
			this.attach(FramebufferAttachment.Color, this.color);
		}

		if (!force && gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
			this.dispose();

			throw new Error('Framebuffer not complete');
		}
	}

	private attachAttachment(slot: FramebufferAttachment, target: FramebufferTarget, handle: WebGLObject | null): void {
		this.bind();

		switch (target) {
			case FramebufferTarget.Texture2D:
				gl.framebufferTexture2D(gl.FRAMEBUFFER, slot, gl.TEXTURE_2D, handle, 0);
				break;

			case FramebufferTarget.Renderbuffer:
				gl.framebufferRenderbuffer(gl.FRAMEBUFFER, slot, gl.RENDERBUFFER, handle);
				break;

			default:
				throw new TypeError('Target not valid!');
		}
	}

	private detachAttachment(slot: FramebufferAttachment, target: FramebufferTarget): void {
		this.bind();

		this.attachAttachment(slot, target, null);

		this.attachments.delete(slot);
	}

	public attach(slot: FramebufferAttachment, texture: Texture): void {
		if (this.attachments.get(slot) === texture) {
			return;
		}

		this.attachAttachment(slot, texture.target, texture.handle);

		this.attachments.set(slot, texture);
	}

	public detach(slot?: FramebufferAttachment): void {
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