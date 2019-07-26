import { Null } from '../Core/Helpers';
import { BindableGraphicsObject, TextureFormat } from './Helpers';
import GL from './GL';
import Texture, { TextureTarget } from './Texture';
import { RenderBufferFormat } from './RenderBuffer';

export enum FrameBufferAttachment {
	Color = 0x8CE0, // GL_COLOR_ATTACHMENT0
	Depth = 0x8D00, // GL_DEPTH_ATTACHMENT
	Stencil = 0x8D20, // GL_STENCIL_ATTACHMENT
	DepthStencil = 0x821A, // GL_DEPTH_STENCIL_ATTACHMENT
	Buffer = 0x8CE0 // EXT_COLOR_ATTACHMENT0_WEBGL
}

class FrameBuffer extends BindableGraphicsObject<FrameBuffer, WebGLFramebuffer> {
	public name: string = 'FrameBuffer';

	public readonly attachments: Map<FrameBufferAttachment, Null<Texture>> = new Map<FrameBufferAttachment, Null<Texture>>();

	public color: Null<Texture | Texture[]> = null;
	public depth: Null<Texture> = null;

	protected get identifier(): string {
		return 'FrameBuffer';
	}

	public constructor(color: Null<Texture | Texture[]> = null, depth: Null<Texture> = null) {
		super(() => GL.createFramebuffer(), (handle) => GL.bindFramebuffer(GL.FRAMEBUFFER, handle), (handle) => GL.deleteFramebuffer(handle));

		this.color = color;
		this.depth = depth;

		if (this.color || this.depth) {
			this.apply();
		}
	}

	public apply(check: boolean = true): void {
		this.bind();

		if (this.depth) {
			switch (this.depth.format) {
				case TextureFormat.Depth16:
				case TextureFormat.Depth32:
				case RenderBufferFormat.Depth:
					this.attach(FrameBufferAttachment.Depth, this.depth);
					break;

				case RenderBufferFormat.Stencil:
					this.attach(FrameBufferAttachment.Stencil, this.depth);
					break;

				case TextureFormat.DepthStencil:
				case RenderBufferFormat.DepthStencil:
					this.attach(FrameBufferAttachment.DepthStencil, this.depth);
					break;
			}
		}

		if (this.color) {
			if (this.color instanceof Array) {
				const buffers: FrameBufferAttachment[] = [];

				for (let i = 0; i < this.color.length; i++) {
					buffers.push(FrameBufferAttachment.Buffer + i);
				}

				GL.drawBuffers(buffers);

				for (let i = 0; i < this.color.length; i++) {
					this.attach(buffers[i], this.color[i]);
				}
			} else {
				this.attach(FrameBufferAttachment.Color, this.color);
			}
		}

		if (check && GL.checkFramebufferStatus(GL.FRAMEBUFFER) !== GL.FRAMEBUFFER_COMPLETE) {
			this.dispose();

			throw new Error('FrameBuffer: not complete');
		}
	}

	private setAttachment(slot: FrameBufferAttachment, target: TextureTarget, handle: Null<WebGLObject>): void {
		this.bind();

		switch (target) {
			case TextureTarget.Texture2D:
				GL.framebufferTexture2D(GL.FRAMEBUFFER, slot, TextureTarget.Texture2D, handle, 0);
				break;

			case TextureTarget.RenderBuffer:
				GL.framebufferRenderbuffer(GL.FRAMEBUFFER, slot, TextureTarget.RenderBuffer, handle);
				break;

			default:
				throw new TypeError('FrameBuffer: invalid target');
		}
	}

	public attach(slot: FrameBufferAttachment, texture: Texture): void {
		const attached: Texture = this.attachments.get(slot) as Texture;

		if (attached && attached === texture) {
			return;
		}

		this.setAttachment(slot, texture.target, texture.handle);

		this.attachments.set(slot, texture);
	}

	public detach(slot?: FrameBufferAttachment): void {
		if (!slot) {
			this.attachments.forEach((_, slot) => this.detach(slot));
			return;
		}

		const texture: Texture = this.attachments.get(slot) as Texture;

		if (!texture) {
			return;
		}

		this.setAttachment(slot, texture.target, null);

		this.attachments.set(slot, null);
	}

	protected disposing(): void {
		this.detach();
		super.disposing();
	}
}

export default FrameBuffer;