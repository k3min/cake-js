import { isArrayLike } from '../Core/Helpers';
import Context from './Context';
import { BindableGraphicsObject } from './Helpers';
import { TextureTarget } from './Texture';
import Texture2DArray from './Texture2DArray';
export var FrameBufferAttachment;
(function (FrameBufferAttachment) {
    FrameBufferAttachment[FrameBufferAttachment["Color"] = 36064] = "Color";
    FrameBufferAttachment[FrameBufferAttachment["Depth"] = 36096] = "Depth";
    FrameBufferAttachment[FrameBufferAttachment["Stencil"] = 36128] = "Stencil";
    FrameBufferAttachment[FrameBufferAttachment["DepthStencil"] = 33306] = "DepthStencil";
})(FrameBufferAttachment || (FrameBufferAttachment = {}));
class FrameBuffer extends BindableGraphicsObject {
    constructor(color = null, depth = null) {
        super(() => Context.createFramebuffer(), (handle) => Context.bindFramebuffer(Context.DRAW_FRAMEBUFFER, handle), (handle) => Context.deleteFramebuffer(handle));
        this.name = 'FrameBuffer';
        this.attachments = new Map();
        this.color = null;
        this.depth = null;
        this.buffers = [];
        this.color = color;
        this.depth = depth;
        if (this.color !== null || this.depth !== null) {
            this.apply(true);
        }
    }
    get identifier() {
        return 'FrameBuffer';
    }
    apply(check = false) {
        this.bind();
        this.detach();
        if (this.depth === null) {
            this.detach(FrameBufferAttachment.DepthStencil);
        }
        else {
            this.attach(FrameBufferAttachment.DepthStencil, this.depth);
        }
        if (this.color !== null) {
            if (isArrayLike(this.color) || this.color instanceof Texture2DArray) {
                const target = this.color;
                for (let index = 0; index < target.length; index++) {
                    this.buffers[index] = FrameBufferAttachment.Color + index;
                }
                if (!(this.color instanceof Texture2DArray)) {
                    Context.drawBuffers(this.buffers.slice(0, target.length));
                    for (let index = 0; index < target.length; index++) {
                        this.attach(FrameBufferAttachment.Color + index, target[index]);
                    }
                }
            }
            else {
                const target = this.color;
                Context.drawBuffers([FrameBufferAttachment.Color]);
                this.attach(FrameBufferAttachment.Color, target);
            }
        }
        if (check && this.attachments.size > 0) {
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
    setAttachment(slot, target, handle, level = 0, layer = 0) {
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
    attach(slot, texture, level = 0, layer = 0) {
        const attached = this.attachments.get(slot);
        // @todo Check if disposed?
        if (level === 0 && layer === 0 && attached !== undefined && attached === texture) {
            return;
        }
        this.setAttachment(slot, texture.target, texture.handle, level, layer);
        this.attachments.set(slot, texture);
    }
    detach(slot, level = 0, layer = 0) {
        if (slot === undefined) {
            this.attachments.forEach((_, slot) => this.detach(slot));
            return;
        }
        const texture = this.attachments.get(slot);
        if (texture === undefined || texture.disposed) {
            return;
        }
        this.setAttachment(slot, texture.target, null, level, layer);
        this.attachments.delete(slot);
    }
}
export default FrameBuffer;
