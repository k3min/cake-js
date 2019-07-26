import { Null } from '../Core/Helpers';
import { BindableGraphicsObject } from './Helpers';
import Texture from './Texture';
export declare enum FrameBufferAttachment {
    Color = 36064,
    Depth = 36096,
    Stencil = 36128,
    DepthStencil = 33306,
    Buffer = 36064
}
declare class FrameBuffer extends BindableGraphicsObject<FrameBuffer, WebGLFramebuffer> {
    name: string;
    readonly attachments: Map<FrameBufferAttachment, Null<Texture>>;
    color: Null<Texture | Texture[]>;
    depth: Null<Texture>;
    protected readonly identifier: string;
    constructor(color?: Null<Texture | Texture[]>, depth?: Null<Texture>);
    apply(check?: boolean): void;
    private setAttachment;
    attach(slot: FrameBufferAttachment, texture: Texture): void;
    detach(slot?: FrameBufferAttachment): void;
    protected disposing(): void;
}
export default FrameBuffer;
