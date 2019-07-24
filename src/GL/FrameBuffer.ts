import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import GL from './GL';
import Texture, { TextureTarget } from './Texture';
import Texture2D from './Texture2D';
import RenderBuffer from './RenderBuffer';

export enum FrameBufferAttachment {
	Color = 36064, // GL_COLOR_ATTACHMENT0
	Depth = 36096,//GL_DEPTH_ATTACHMENT
	DepthStencil = 33306,//GL_DEPTH_STENCIL_ATTACHMENT
}

class FrameBuffer extends BindableGraphicsObject<FrameBuffer, WebGLFramebuffer> {
	public name: string = 'FrameBuffer';

	public readonly attachments: Map<FrameBufferAttachment, Texture> = new Map<FrameBufferAttachment, Texture>();

	public color: Null<Texture2D> = null;
	public depth: Null<RenderBuffer> = null;

	protected get identifier(): string {
		return 'FrameBuffer';
	}

	public constructor() {
		super(() => GL.createFramebuffer(), (handle) => GL.bindFramebuffer(GL.FRAMEBUFFER, handle), (handle) => GL.deleteFramebuffer(handle));
	}

	public apply(check: boolean = true): void {
		this.bind();

		if (this.depth) {
			this.attach(this.depth.stencil ? FrameBufferAttachment.DepthStencil : FrameBufferAttachment.Depth, this.depth);
		}

		if (this.color) {
			this.attach(FrameBufferAttachment.Color, this.color);
		}

		if (check && GL.checkFramebufferStatus(GL.FRAMEBUFFER) !== GL.FRAMEBUFFER_COMPLETE) {
			this.dispose();

			throw new Error('FrameBuffer not complete');
		}
	}

	private attachAttachment(slot: FrameBufferAttachment, target: TextureTarget, handle: Null<WebGLObject>): void {
		this.bind();

		switch (target) {
			case TextureTarget.Texture2D:
				GL.framebufferTexture2D(GL.FRAMEBUFFER, slot, target, handle, 0);
				break;

			case TextureTarget.RenderBuffer:
				GL.framebufferRenderbuffer(GL.FRAMEBUFFER, slot, target, handle);
				break;

			default:
				throw new TypeError('Target not valid!');
		}
	}

	private detachAttachment(slot: FrameBufferAttachment, target: TextureTarget): void {
		this.bind();

		this.attachAttachment(slot, target, null);

		this.attachments.delete(slot);
	}

	public attach(slot: FrameBufferAttachment, texture: Texture): void {
		if (this.attachments.get(slot) === texture) {
			return;
		}

		this.attachAttachment(slot, texture.target, texture.handle);

		this.attachments.set(slot, texture);
	}

	public detach(slot?: FrameBufferAttachment): void {
		if (!slot) {
			this.attachments.forEach((texture, slot) => this.detachAttachment(slot, texture.target));
			this.attachments.clear();
			return;
		}

		const texture = this.attachments.get(slot);

		if (!texture) {
			return;
		}

		this.attachAttachment(slot, texture.target, null);

		this.attachments.delete(slot);
	}

	protected disposing(): void {
		this.detach();
		super.disposing();
	}
}

export default FrameBuffer;