import Null from '../Helpers/Null';
import Texture, { TextureFormat } from './Texture';
declare class Renderbuffer extends Texture<WebGLRenderbuffer> {
    name: string;
    readonly stencil: boolean;
    static readonly bound: Null<Renderbuffer>;
    protected readonly identifier: string;
    constructor(width: number, height: number, format: TextureFormat, stencil: boolean);
    apply(): void;
}
export default Renderbuffer;
