import { Null } from '../Core/Helpers';
import { BindableGraphicsObject } from './Helpers';
import Texture from './Texture';
export declare enum FrameBufferAttachment {
    Color = 36064,
    Depth = 36096,
    Stencil = 36128,
    DepthStencil = 33306
}
declare class FrameBuffer extends BindableGraphicsObject<FrameBuffer, WebGLFramebuffer> {
    name: string;
    readonly attachments: Map<FrameBufferAttachment, Texture>;
    color: Null<Texture | ArrayLike<Texture>>;
    depth: Null<Texture>;
    protected readonly identifier: string;
    constructor(color?: Null<Texture | ArrayLike<Texture>>, depth?: Null<Texture>);
    apply(check?: boolean): void;
    check(): void;
    private setAttachment;
    attach(slot: FrameBufferAttachment, texture: Texture): void;
    detach(slot?: FrameBufferAttachment): void;
}
export default FrameBuffer;
