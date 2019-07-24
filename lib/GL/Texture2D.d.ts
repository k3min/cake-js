import { Vector4 } from '../Math';
import Texture, { TextureFormat } from './Texture';
declare class Texture2D extends Texture<WebGLTexture> {
    name: string;
    readonly texelSize: Vector4;
    constructor(width: number, height: number, format: TextureFormat);
    static load(url: string, format: TextureFormat): Promise<Texture2D>;
    apply(): void;
}
export default Texture2D;
