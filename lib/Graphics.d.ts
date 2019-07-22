import Disposable from './Helpers/Disposable';
import Null from './Helpers/Null';
import Quad from './Quad';
import Material from './Material';
import Texture2D from './GL/Texture2D';
import RenderBuffer from './GL/RenderBuffer';
declare class Graphics implements Disposable {
    private framebuffer;
    quad: Null<Quad>;
    dispose(): void;
    setRenderTarget(color?: Null<Texture2D>, depth?: Null<RenderBuffer>): void;
    blit(a: Null<Texture2D>, b: Null<Texture2D>, material: Material): void;
}
declare let graphics: Graphics;
export default graphics;
