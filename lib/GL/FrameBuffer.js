import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import GL from './GL';
import { TextureTarget } from './Texture';
export var FrameBufferAttachment;
(function (FrameBufferAttachment) {
    FrameBufferAttachment[FrameBufferAttachment["Color"] = 36064] = "Color";
    FrameBufferAttachment[FrameBufferAttachment["Depth"] = 36096] = "Depth";
    FrameBufferAttachment[FrameBufferAttachment["DepthStencil"] = 33306] = "DepthStencil";
})(FrameBufferAttachment || (FrameBufferAttachment = {}));
class FrameBuffer extends BindableGraphicsObject {
    constructor() {
        super(() => GL.createFramebuffer(), (handle) => GL.bindFramebuffer(GL.FRAMEBUFFER, handle), (handle) => GL.deleteFramebuffer(handle));
        this.name = 'FrameBuffer';
        this.attachments = new Map();
        this.color = null;
        this.depth = null;
    }
    get identifier() {
        return 'FrameBuffer';
    }
    apply(check = true) {
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
    attachAttachment(slot, target, handle) {
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
    detachAttachment(slot, target) {
        this.bind();
        this.attachAttachment(slot, target, null);
        this.attachments.delete(slot);
    }
    attach(slot, texture) {
        if (this.attachments.get(slot) === texture) {
            return;
        }
        this.attachAttachment(slot, texture.target, texture.handle);
        this.attachments.set(slot, texture);
    }
    detach(slot) {
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
    disposing() {
        this.detach();
        super.disposing();
    }
}
export default FrameBuffer;
