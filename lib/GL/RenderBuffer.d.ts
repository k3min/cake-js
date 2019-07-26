import Texture from './Texture';
export declare enum RenderBufferFormat {
    RGBA32 = 32854,
    R5G5B5A1 = 32855,
    R5G6B5 = 36194,
    Depth = 33189,
    Stencil = 36168,
    DepthStencil = 34041
}
declare class RenderBuffer extends Texture<WebGLRenderbuffer> {
    name: string;
    protected readonly identifier: string;
    constructor(width: number, height: number, format: RenderBufferFormat);
    apply(): void;
}
export default RenderBuffer;
