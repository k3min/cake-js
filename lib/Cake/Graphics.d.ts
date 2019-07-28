import { Disposable } from '../Core';
import { Texture } from '../GL';
import FrameBuffer from '../GL/FrameBuffer';
import { Null } from '../Core/Helpers';
import Material from './Material';
import Quad from './Quad';
declare class Graphics implements Disposable {
    private disposed;
    readonly framebuffer: FrameBuffer;
    readonly quad: Quad;
    dispose(): void;
    setRenderTarget(color?: Null<Texture | ArrayLike<Texture>>, depth?: Null<Texture>): void;
    blit(a: Null<Texture>, b: Null<Texture>, material: Material): void;
}
declare const graphics: Graphics;
export default graphics;
