import { isArrayLike, Null } from '../Core/Helpers';
import Context from './Context';
import { BindableGraphicsObject } from './Helpers';
import Texture, { TextureTarget } from './Texture';
import Texture2DArray from './Texture2DArray';

export enum FrameBufferAttachment {
	Color = 0x8CE0, // GL_COLOR_ATTACHMENT0
	Depth = 0x8D00, // GL_DEPTH_ATTACHMENT
	Stencil = 0x8D20, // GL_STENCIL_ATTACHMENT
	DepthStencil = 0x821A, // GL_DEPTH_STENCIL_ATTACHMENT
}

class FrameBuffer extends BindableGraphicsObject<FrameBuffer, WebGLFramebuffer> {
	public name: string = 'FrameBuffer';

	public readonly attachments: Map<FrameBufferAttachment, Texture> = new Map<FrameBufferAttachment, Texture>();

	public color: Null<Texture | ArrayLike<Texture>> = null;
	public depth: Null<Texture> = null;

	public readonly buffers: FrameBufferAttachment[] = [];

	protected get identifier(): string {
		return 'FrameBuffer';
	}

	public constructor(color: Null<Texture | ArrayLike<Texture>> = null, depth: Null<Texture> = null) {
		super(() => Context.createFramebuffer(), (handle) => Context.bindFramebuffer(Context.DRAW_FRAMEBUFFER, handle), (handle) => Context.deleteFramebuffer(handle));

		this.color = color;
		this.depth = depth;

		if (this.color !== null || this.depth !== null) {
			this.apply(true);
		}
	}

	public apply(check: boolean = false): void {
		this.bind();

		this.detach();

		if (this.depth === null) {
			this.detach(FrameBufferAttachment.DepthStencil);
		} else {
			this.attach(FrameBufferAttachment.DepthStencil, this.depth);
		}

		if (this.color !== null) {
			if (isArrayLike(this.color) || this.color instanceof Texture2DArray) {
				const target: ArrayLike<Texture> = this.color as ArrayLike<Texture>;

				for (let index = 0; index < target.length; index++) {
					this.buffers[index] = FrameBufferAttachment.Color + index;
				}

				if (!(this.color instanceof Texture2DArray)) {
					Context.drawBuffers(this.buffers.slice(0, target.length));

					for (let index = 0; index < target.length; index++) {
						this.attach(FrameBufferAttachment.Color + index, target[index]);
					}
				}
			} else {
				const target: Texture = this.color as Texture;

				Context.drawBuffers([FrameBufferAttachment.Color]);

				this.attach(FrameBufferAttachment.Color, target);
			}
		}

		if (check && this.attachments.size > 0) {
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

		switch (Context.checkFramebufferStatus(Context.DRAW_FRAMEBUFFER)) {
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

	private setAttachment(slot: FrameBufferAttachment, target: TextureTarget, handle: Null<WebGLObject>, level: number = 0, layer: number = 0): void {
		this.bind();

		switch (target) {
			case TextureTarget.Texture2D:
				Context.framebufferTexture2D(Context.DRAW_FRAMEBUFFER, slot, TextureTarget.Texture2D, handle, level);
				break;

			case TextureTarget.RenderBuffer:
				Context.framebufferRenderbuffer(Context.DRAW_FRAMEBUFFER, slot, TextureTarget.RenderBuffer, handle);
				break;

			case TextureTarget.Texture2DArray:
				Context.framebufferTextureLayer(Context.DRAW_FRAMEBUFFER, slot, handle, level, layer);
				break;

			default:
				throw new TypeError('FrameBuffer: invalid target');
		}
	}

	public attach(slot: FrameBufferAttachment, texture: Texture, level: number = 0, layer: number = 0): void {
		const attached: Texture = this.attachments.get(slot) as Texture;

		// @todo Check if disposed?
		if (level === 0 && layer === 0 && attached !== undefined && attached === texture) {
			return;
		}

		this.setAttachment(slot, texture.target, texture.handle, level, layer);

		this.attachments.set(slot, texture);
	}

	public detach(slot?: FrameBufferAttachment, level: number = 0, layer: number = 0): void {
		if (slot === undefined) {
			this.attachments.forEach((_, slot: FrameBufferAttachment): void => this.detach(slot));
			return;
		}

		const texture: Texture = this.attachments.get(slot) as Texture;

		if (texture === undefined || texture.disposed) {
			return;
		}

		this.setAttachment(slot, texture.target, null, level, layer);

		this.attachments.delete(slot);
	}
}

export default FrameBuffer;