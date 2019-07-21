import Texture from './Texture';
export declare enum CubeMapFace {
    PosX,
    NegX,
    PosY,
    NegY,
    PosZ,
    NegZ,
    Count = 6
}
declare class CubeMap extends Texture<WebGLTexture> {
    constructor(width: number, height: number, format: number);
    static load(url: string): Promise<CubeMap>;
    private parse;
    apply(): void;
}
export default CubeMap;
