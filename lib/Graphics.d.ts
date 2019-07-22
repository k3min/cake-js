import FrameBuffer from './GL/FrameBuffer';
import Disposable from './Helpers/Disposable';
import Null from './Helpers/Null';
import Quad from './Quad';
import Material from './Material';
import Texture2D from './GL/Texture2D';
import RenderBuffer from './GL/RenderBuffer';
declare class Graphics implements Disposable {
    framebuffer: Null<FrameBuffer>;
    quad: Null<Quad>;
    dispose(): void;
    setRenderTarget(color?: Null<Texture2D>, depth?: Null<RenderBuffer>): void;
    blit(a: Null<Texture2D>, b: Null<Texture2D>, material: Material): void;
}
declare const _default: Graphics;
export default _default;
