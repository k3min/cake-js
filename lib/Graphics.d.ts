import Disposable from './Helpers/Disposable';
import Quad from './Quad';
import Material from './Material';
import Texture2D from './GL/Texture2D';
import Renderbuffer from './GL/Renderbuffer';
declare class Graphics implements Disposable {
    private framebuffer?;
    quad?: Quad;
    dispose(): void;
    setRenderTarget(color?: Texture2D, depth?: Renderbuffer): void;
    blit(a: Texture2D, b: Texture2D, material: Material): void;
}
declare let graphics: Graphics;
export default graphics;
