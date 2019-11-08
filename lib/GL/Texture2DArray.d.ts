import Texture, { TextureFormat } from './Texture';
declare class Texture2DArray extends Texture<WebGLTexture> {
    name: string;
    length: number;
    constructor(width: number, height: number, depth: number, format: TextureFormat);
    apply(): void;
}
export default Texture2DArray;
