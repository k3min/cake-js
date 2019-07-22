import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import gl from './index';
class FrameBuffer extends BindableGraphicsObject {
    constructor() {
        super(() => gl.createFramebuffer(), (handle) => gl.bindFramebuffer(gl.FRAMEBUFFER, handle), (handle) => gl.deleteFramebuffer(handle));
        this.name = 'FrameBuffer';
        this.attachments = new Map();
        this.color = null;
        this.depth = null;
    }
    get identifier() {
        return 'framebuffer';
    }
    apply() {
        this.bind();
        if (this.depth) {
            this.attach(this.depth.stencil ? gl.DEPTH_STENCIL_ATTACHMENT : gl.DEPTH_ATTACHMENT, this.depth);
        }
        if (this.color) {
            this.attach(gl.COLOR_ATTACHMENT0, this.color);
        }
        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            this.dispose();
            throw new Error('FrameBuffer not complete');
        }
    }
    attachAttachment(slot, target, handle) {
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
    dispose() {
        this.detach();
        super.dispose();
    }
}
export default FrameBuffer;
