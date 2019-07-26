import { BindableGraphicsObject, TextureFormat } from './Helpers';
import GL from './GL';
import { TextureTarget } from './Texture';
import { RenderBufferFormat } from './RenderBuffer';
export var FrameBufferAttachment;
(function (FrameBufferAttachment) {
    FrameBufferAttachment[FrameBufferAttachment["Color"] = 36064] = "Color";
    FrameBufferAttachment[FrameBufferAttachment["Depth"] = 36096] = "Depth";
    FrameBufferAttachment[FrameBufferAttachment["Stencil"] = 36128] = "Stencil";
    FrameBufferAttachment[FrameBufferAttachment["DepthStencil"] = 33306] = "DepthStencil";
    FrameBufferAttachment[FrameBufferAttachment["Buffer"] = 36064] = "Buffer"; // EXT_COLOR_ATTACHMENT0_WEBGL
})(FrameBufferAttachment || (FrameBufferAttachment = {}));
class FrameBuffer extends BindableGraphicsObject {
    constructor(color = null, depth = null) {
        super(() => GL.createFramebuffer(), (handle) => GL.bindFramebuffer(GL.FRAMEBUFFER, handle), (handle) => GL.deleteFramebuffer(handle));
        this.name = 'FrameBuffer';
        this.attachments = new Map();
        this.color = null;
        this.depth = null;
        this.color = color;
        this.depth = depth;
        if (this.color || this.depth) {
            this.apply();
        }
    }
    get identifier() {
        return 'FrameBuffer';
    }
    apply(check = true) {
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
                const buffers = [];
                for (let i = 0; i < this.color.length; i++) {
                    buffers.push(FrameBufferAttachment.Buffer + i);
                }
                GL.drawBuffers(buffers);
                for (let i = 0; i < this.color.length; i++) {
                    this.attach(buffers[i], this.color[i]);
                }
            }
            else {
                this.attach(FrameBufferAttachment.Color, this.color);
            }
        }
        if (check && GL.checkFramebufferStatus(GL.FRAMEBUFFER) !== GL.FRAMEBUFFER_COMPLETE) {
            this.dispose();
            throw new Error('FrameBuffer: not complete');
        }
    }
    setAttachment(slot, target, handle) {
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
        this.attachments.set(slot, null);
    }
    disposing() {
        this.detach();
        super.disposing();
    }
}
export default FrameBuffer;
