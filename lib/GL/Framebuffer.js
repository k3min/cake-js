import BindableObject from '../Helpers/BindableObject';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import FramebufferTarget from './Helpers/FramebufferTarget';
import gl from './index';
export var FramebufferAttachment;
(function (FramebufferAttachment) {
    FramebufferAttachment[FramebufferAttachment["DepthStencil"] = gl.DEPTH_STENCIL_ATTACHMENT] = "DepthStencil";
    FramebufferAttachment[FramebufferAttachment["Depth"] = gl.DEPTH_ATTACHMENT] = "Depth";
    FramebufferAttachment[FramebufferAttachment["Color"] = gl.COLOR_ATTACHMENT0] = "Color";
})(FramebufferAttachment || (FramebufferAttachment = {}));
class Framebuffer extends BindableGraphicsObject {
    constructor() {
        super(gl.createFramebuffer, (handle) => gl.bindFramebuffer(gl.FRAMEBUFFER, handle), gl.deleteFramebuffer);
        this.name = 'Framebuffer';
        this.attachments = new Map();
        if (this.color || this.depth) {
            this.apply();
            this.unbind();
        }
    }
    static get bound() {
        return BindableObject.map.get('framebuffer');
    }
    get identifier() {
        return 'framebuffer';
    }
    apply(force = false) {
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
    attachAttachment(slot, target, handle) {
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
    dispose() {
        this.detach();
        super.dispose();
    }
}
export default Framebuffer;
