import Texture, { TextureFormat } from './Texture';
declare class RenderBuffer extends Texture<WebGLRenderbuffer> {
    name: string;
    protected readonly identifier: string;
    constructor(width: number, height: number, format: TextureFormat);
    apply(): void;
}
export default RenderBuffer;
