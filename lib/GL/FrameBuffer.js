import { isArrayLike } from '../Core/Helpers';
import { BindableGraphicsObject } from './Helpers';
import Context from './Context';
import { TextureFormat, TextureTarget } from './Texture';
export var FrameBufferAttachment;
(function (FrameBufferAttachment) {
    FrameBufferAttachment[FrameBufferAttachment["Color"] = 36064] = "Color";
    FrameBufferAttachment[FrameBufferAttachment["Depth"] = 36096] = "Depth";
    FrameBufferAttachment[FrameBufferAttachment["Stencil"] = 36128] = "Stencil";
    FrameBufferAttachment[FrameBufferAttachment["DepthStencil"] = 33306] = "DepthStencil";
})(FrameBufferAttachment || (FrameBufferAttachment = {}));
class FrameBuffer extends BindableGraphicsObject {
    constructor(color = null, depth = null) {
        super(() => Context.createFramebuffer(), (handle) => Context.bindFramebuffer(Context.FRAMEBUFFER, handle), (handle) => Context.deleteFramebuffer(handle));
        this.name = 'FrameBuffer';
        this.attachments = new Map();
        this.color = null;
        this.depth = null;
        this.color = color;
        this.depth = depth;
        if (this.color !== null || this.depth !== null) {
            this.apply();
        }
    }
    get identifier() {
        return 'FrameBuffer';
    }
    apply(check = true) {
        this.bind();
        this.detach();
        if (this.depth === null) {
            this.detach(FrameBufferAttachment.Depth);
            this.detach(FrameBufferAttachment.Stencil);
            this.detach(FrameBufferAttachment.DepthStencil);
        }
        else {
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
                    throw new TypeError(`FrameBuffer (${this.name}): unknown depth format '${this.depth.format}'`);
            }
        }
        if (this.color !== null) {
            if (isArrayLike(this.color)) {
                const textures = this.color;
                const buffers = new Array(textures.length);
                for (let index = 0; index < buffers.length; index++) {
                    buffers[index] = FrameBufferAttachment.Color + index;
                }
                Context.drawBuffers(buffers);
                buffers.forEach((buffer, index) => {
                    this.attach(buffer, textures[index]);
                });
            }
            else {
                const texture = this.color;
                Context.drawBuffers([FrameBufferAttachment.Color]);
                this.attach(FrameBufferAttachment.Color, texture);
            }
        }
        if (check) {
            try {
                this.check();
            }
            catch (e) {
                this.dispose();
                throw e;
            }
        }
    }
    check() {
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
    setAttachment(slot, target, handle) {
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
    attach(slot, texture) {
        const attached = this.attachments.get(slot);
        if (attached && attached === texture) {
            return;
        }
        this.setAttachment(slot, texture.target, texture.handle);
        this.attachments.set(slot, texture);
    }
    detach(slot) {
        if (!slot) {
            this.attachments.forEach((_, slot) => this.detach(slot));
            return;
        }
        const texture = this.attachments.get(slot);
        if (!texture) {
            return;
        }
        this.setAttachment(slot, texture.target, null);
        this.attachments.delete(slot);
    }
}
export default FrameBuffer;
