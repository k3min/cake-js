import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
export declare enum TextureFormat {
    Alpha8 = 0,
    RGB24 = 1,
    RGBA32 = 2,
    R5G6B5 = 3,
    RGBA16 = 4,
    RGBAFloat = 5
}
export declare enum PixelFormat {
    Alpha = 6406,
    RGB = 6407,
    RGBA = 6408
}
export declare enum PixelType {
    Uint8 = 5121,
    Float32 = 5126,
    Uint16 = 32819,
    Uint565 = 33635
}
export interface Mipmap {
    data: ArrayBufferView;
    width: number;
    height: number;
}
export declare enum TextureTarget {
    Texture2D = 3553,
    CubeMap = 34067,
    RenderBuffer = 36161
}
declare abstract class Texture<T extends WebGLObject = WebGLObject> extends BindableGraphicsObject<Texture<T>, T> {
    name: string;
    readonly target: TextureTarget;
    private readonly parameters;
    protected data: TexImageSource | ArrayBufferView | Mipmap[] | Mipmap[][] | null;
    protected readonly pixelFormat: PixelFormat;
    protected readonly pixelType: PixelType;
    readonly format: TextureFormat;
    width: number;
    height: number;
    protected readonly identifier: string;
    protected constructor(width: number, height: number, format: TextureFormat, target: TextureTarget, genFn: () => Null<T>, bindFn: (handle: Null<T>) => void, releaseFn: (handle: T) => void);
    set(name: GLenum, value: GLenum): void;
    abstract apply(): void;
    static getPixelFormat(format: TextureFormat): PixelFormat;
    static getPixelType(format: TextureFormat): PixelType;
}
export default Texture;
