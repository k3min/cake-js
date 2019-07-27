import { Vector4 } from '../Math';
import Texture, { TextureFormat } from './Texture';
/**
 * @todo Customizable filter / wrap
 */
declare class Texture2D extends Texture<WebGLTexture> {
    name: string;
    readonly texelSize: Vector4;
    constructor(width: number, height: number, format: TextureFormat);
    /**
     * @todo Make this more generic
     */
    static loadRaw(uri: string): Promise<Texture2D>;
    static load(uri: string, format: TextureFormat, mipChain?: boolean): Promise<Texture2D>;
    apply(updateMipmaps?: boolean): void;
}
export default Texture2D;
