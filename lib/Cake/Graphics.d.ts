import { FrameBuffer, RenderBuffer, Texture2D } from '../GL';
import { Disposable, Null } from '../Helpers';
import Material from './Material';
import Quad from './Quad';
declare class Graphics implements Disposable {
    private disposed;
    readonly framebuffer: FrameBuffer;
    readonly quad: Quad;
    dispose(): boolean;
    setRenderTarget(color?: Null<Texture2D>, depth?: Null<RenderBuffer>): void;
    blit(a: Null<Texture2D>, b: Null<Texture2D>, material: Material): void;
}
declare const graphics: Graphics;
export default graphics;
