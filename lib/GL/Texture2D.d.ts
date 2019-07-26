import { Vector4 } from '../Math';
import { TextureFormat } from './Helpers';
import Texture from './Texture';
declare class Texture2D extends Texture<WebGLTexture> {
    name: string;
    readonly texelSize: Vector4;
    private readonly pixelFormat;
    private readonly pixelType;
    constructor(width: number, height: number, format: TextureFormat);
    static load(url: string, format: TextureFormat): Promise<Texture2D>;
    apply(): void;
}
export default Texture2D;
