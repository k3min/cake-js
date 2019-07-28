import { isArrayLike, Null } from '../Core/Helpers';
import { BindableGraphicsObject } from './Helpers';
import Context from './Context';
import Texture, { TextureFormat, TextureTarget } from './Texture';

export enum FrameBufferAttachment {
	Color = 0x8CE0, // GL_COLOR_ATTACHMENT0 / EXT_COLOR_ATTACHMENT0_WEBGL
	Depth = 0x8D00, // GL_DEPTH_ATTACHMENT
	Stencil = 0x8D20, // GL_STENCIL_ATTACHMENT
	DepthStencil = 0x821A, // GL_DEPTH_STENCIL_ATTACHMENT
}

class FrameBuffer extends BindableGraphicsObject<FrameBuffer, WebGLFramebuffer> {
	public name: string = 'FrameBuffer';

	public readonly attachments: Map<FrameBufferAttachment, Texture> = new Map<FrameBufferAttachment, Texture>();

	public color: Null<Texture | ArrayLike<Texture>> = null;
	public depth: Null<Texture> = null;

	protected get identifier(): string {
		return 'FrameBuffer';
	}

	public constructor(color: Null<Texture | ArrayLike<Texture>> = null, depth: Null<Texture> = null) {
		super(() => Context.createFramebuffer(), (handle) => Context.bindFramebuffer(Context.FRAMEBUFFER, handle), (handle) => Context.deleteFramebuffer(handle));

		this.color = color;
		this.depth = depth;

		if (this.color !== null || this.depth !== null) {
			this.apply();
		}
	}

	public apply(check: boolean = true): void {
		this.bind();

		this.detach();

		if (this.depth === null) {
			this.detach(FrameBufferAttachment.Depth);
			this.detach(FrameBufferAttachment.Stencil);
			this.detach(FrameBufferAttachment.DepthStencil);
		} else {
			switch (this.depth.format) {
				case TextureFormat.Depth16:
				case TextureFormat.Depth32:
				case TextureFormat.Depth:
					this.attach(FrameBufferAttachment.Depth, this.depth);
					this.detach(FrameBufferAttachment.Stencil);
					this.detach(FrameBufferAttachment.DepthStencil);
					break;

				case TextureFormat.Stencil:
					this.detach(FrameBufferAttachment.Depth);
					this.attach(FrameBufferAttachment.Stencil, this.depth);
					this.detach(FrameBufferAttachment.DepthStencil);
					break;

				case TextureFormat.DepthStencil:
					this.detach(FrameBufferAttachment.Depth);
					this.detach(FrameBufferAttachment.Stencil);
					this.attach(FrameBufferAttachment.DepthStencil, this.depth);
					break;

				default:
					throw new TypeError(`FrameBuffer (${ this.name }): unknown depth format '${ this.depth.format }'`);
			}
		}

		if (this.color !== null) {
			if (isArrayLike(this.color)) {
				const textures: ArrayLike<Texture> = this.color as ArrayLike<Texture>;
				const buffers: FrameBufferAttachment[] = new Array<FrameBufferAttachment>(textures.length);

				for (let index = 0; index < buffers.length; index++) {
					buffers[index] = FrameBufferAttachment.Color + index;
				}

				Context.drawBuffers(buffers);

				buffers.forEach((buffer: FrameBufferAttachment, index: number): void => {
					this.attach(buffer, textures[index]);
				});
			} else {
				const texture: Texture = this.color as Texture;

				Context.drawBuffers([FrameBufferAttachment.Color]);

				this.attach(FrameBufferAttachment.Color, texture);
			}
		}

		if (check) {
			try {
				this.check();
			} catch (e) {
				this.dispose();
				throw e;
			}
		}
	}

	public check(): void {
		this.bind();

		switch (Context.checkFramebufferStatus(Context.FRAMEBUFFER)) {
			case Context.FRAMEBUFFER_UNSUPPORTED:
				throw new Error('FrameBuffer: unsupported');

			case Context.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
				throw new Error('FrameBuffer: incomplete attachment');

			case Context.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
				throw new Error('FrameBuffer: incomplete dimensions');

			case Context.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
				throw new Error('FrameBuffer: incomplete missing attachment');

			default:
				break;
		}
	}

	private setAttachment(slot: FrameBufferAttachment, target: TextureTarget, handle: Null<WebGLObject>): void {
		this.bind();

		switch (target) {
			case TextureTarget.Texture2D:
				Context.framebufferTexture2D(Context.FRAMEBUFFER, slot, TextureTarget.Texture2D, handle, 0);
				break;

			case TextureTarget.RenderBuffer:
				Context.framebufferRenderbuffer(Context.FRAMEBUFFER, slot, TextureTarget.RenderBuffer, handle);
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
			this.attachments.forEach((_, slot: FrameBufferAttachment): void => this.detach(slot));
			return;
		}

		const texture: Texture = this.attachments.get(slot) as Texture;

		if (!texture) {
			return;
		}

		this.setAttachment(slot, texture.target, null);

		this.attachments.delete(slot);
	}
}

export default FrameBuffer;