import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import Texture from './Texture';
import Texture2D from './Texture2D';
import RenderBuffer from './RenderBuffer';
declare class FrameBuffer extends BindableGraphicsObject<FrameBuffer, WebGLFramebuffer> {
    name: string;
    readonly attachments: Map<GLenum, Texture>;
    color: Null<Texture2D>;
    depth: Null<RenderBuffer>;
    protected readonly identifier: string;
    constructor();
    apply(check?: boolean): void;
    private attachAttachment;
    private detachAttachment;
    attach(slot: GLenum, texture: Texture): void;
    detach(slot?: GLenum): void;
    dispose(): void;
}
export default FrameBuffer;
