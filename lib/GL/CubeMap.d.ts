import Texture from './Texture';
declare class CubeMap extends Texture<WebGLTexture> {
    constructor(width: number, height: number, format: number);
    static load(url: string): Promise<CubeMap>;
    private parse;
    apply(): void;
}
export default CubeMap;
