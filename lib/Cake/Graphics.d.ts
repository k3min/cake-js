import FrameBuffer from '../GL/FrameBuffer';
import RenderBuffer from '../GL/RenderBuffer';
import Texture2D from '../GL/Texture2D';
import Disposable from '../Helpers/Disposable';
import Null from '../Helpers/Null';
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
