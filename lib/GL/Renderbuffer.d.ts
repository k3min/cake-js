import Texture, { TextureFormat } from './Texture';
declare class RenderBuffer extends Texture<WebGLRenderbuffer> {
    name: string;
    readonly stencil: boolean;
    protected readonly identifier: string;
    constructor(width: number, height: number, format: TextureFormat, stencil: boolean);
    apply(): void;
}
export default RenderBuffer;
