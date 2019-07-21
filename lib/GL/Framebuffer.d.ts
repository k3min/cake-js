import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import Texture from './Texture';
import Texture2D from './Texture2D';
import Renderbuffer from './Renderbuffer';
declare class Framebuffer extends BindableGraphicsObject<Framebuffer, WebGLFramebuffer> {
    name: string;
    readonly attachments: Map<GLenum, Texture>;
    color?: Texture2D;
    depth?: Renderbuffer;
    static readonly bound: Null<Framebuffer>;
    protected readonly identifier: string;
    constructor();
    apply(force?: boolean): void;
    private attachAttachment;
    private detachAttachment;
    attach(slot: GLenum, texture: Texture): void;
    detach(slot?: GLenum): void;
    dispose(): void;
}
export default Framebuffer;
