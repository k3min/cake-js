import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import Texture from './Texture';
import Texture2D from './Texture2D';
import RenderBuffer from './RenderBuffer';
export declare enum FrameBufferAttachment {
    Color = 36064,
    Depth = 36096,
    DepthStencil = 33306
}
declare class FrameBuffer extends BindableGraphicsObject<FrameBuffer, WebGLFramebuffer> {
    name: string;
    readonly attachments: Map<FrameBufferAttachment, Texture>;
    color: Null<Texture2D>;
    depth: Null<RenderBuffer>;
    protected readonly identifier: string;
    constructor();
    apply(check?: boolean): void;
    private attachAttachment;
    private detachAttachment;
    attach(slot: FrameBufferAttachment, texture: Texture): void;
    detach(slot?: FrameBufferAttachment): void;
    protected disposing(): void;
}
export default FrameBuffer;
