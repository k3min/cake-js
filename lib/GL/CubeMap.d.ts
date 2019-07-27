import Texture, { TextureFormat } from './Texture';
/**
 * @todo Set appropriate filter / wrap
 */
declare class CubeMap extends Texture<WebGLTexture> {
    name: string;
    constructor(width: number, height: number, format: TextureFormat);
    static load(url: string): Promise<CubeMap>;
    private parse;
    apply(): void;
}
export default CubeMap;
