import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
export declare enum TextureFormat {
    Alpha8 = 0,
    RGB24 = 1,
    RGBA32 = 2,
    RGB565 = 3,
    RGBA4444 = 4,
    RGBAFloat = 5
}
export interface Mipmap {
    data: ArrayBufferView;
    width: number;
    height: number;
}
declare abstract class Texture<GL extends WebGLObject = WebGLObject> extends BindableGraphicsObject<Texture<GL>, GL> {
    name: string;
    readonly target: GLenum;
    protected data: TexImageSource | ArrayBufferView | Mipmap[] | Mipmap[][] | null;
    protected readonly pixelInternalFormat: GLenum;
    protected readonly pixelFormat: GLenum;
    protected readonly pixelType: GLenum;
    readonly format: TextureFormat;
    width: number;
    height: number;
    static readonly bound: Null<Texture>;
    protected readonly identifier: string;
    protected constructor(width: number, height: number, format: TextureFormat, target: GLenum, genFn: () => GL | null, bindFn: (target: GLenum, handle: Null<GL>) => void, releaseFn: (handle: GL) => void);
    abstract apply(): void;
    static getPixelFormat(format: TextureFormat): GLenum;
    static getPixelInternalFormat(format: TextureFormat): GLenum;
    static getPixelType(format: TextureFormat): GLenum;
}
export default Texture;
