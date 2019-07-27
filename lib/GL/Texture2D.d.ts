import { Vector4 } from '../Math';
import Texture, { TextureFormat } from './Texture';
/**
 * @todo Customizable filter / wrap
 */
declare class Texture2D extends Texture<WebGLTexture> {
    name: string;
    readonly texelSize: Vector4;
    constructor(width: number, height: number, format: TextureFormat);
    static load(url: string, format: TextureFormat, mipChain?: boolean): Promise<Texture2D>;
    apply(updateMipmaps?: boolean): void;
}
export default Texture2D;
