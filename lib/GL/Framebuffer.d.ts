import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import Texture from './Texture';
import Texture2D from './Texture2D';
import Renderbuffer from './Renderbuffer';
export declare enum FramebufferAttachment {
    DepthStencil,
    Depth,
    Color
}
export declare enum FramebufferTarget {
    Texture2D,
    Renderbuffer,
    CubeMap
}
declare class Framebuffer extends BindableGraphicsObject<Framebuffer, WebGLFramebuffer> {
    name: string;
    readonly _attachments: Map<FramebufferAttachment, Texture>;
    color?: Texture2D;
    depth?: Renderbuffer;
    static readonly bound: Null<Framebuffer>;
    protected readonly identifier: string;
    constructor();
    apply(force?: boolean): void;
    private _attach;
    private _detach;
    attach(slot: FramebufferAttachment, texture: Texture): void;
    detach(slot?: FramebufferAttachment): void;
    dispose(): void;
}
export default Framebuffer;
