import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import FramebufferTarget from './Helpers/FramebufferTarget';
export declare enum TextureFormat {
    Alpha8 = 0,
    RGB24 = 1,
    RGBA32 = 2,
    RGB565 = 3,
    RGBA4444 = 4,
    RGBAFloat = 5
}
export declare enum PixelFormat {
    Alpha,
    DepthComponent,
    DepthStencil,
    Luminance,
    LuminanceAlpha,
    Rgb,
    Rgba
}
export declare enum PixelInternalFormat {
    Alpha,
    Luminance,
    LuminanceAlpha,
    Rgb,
    Rgba
}
export declare enum PixelType {
    Byte,
    Float,
    Int,
    Short,
    UnsignedByte,
    UnsignedInt,
    UnsignedShort,
    UnsignedShort4444,
    UnsignedShort5551,
    UnsignedShort565
}
export interface Mipmap {
    data: ArrayBufferView;
    width: number;
    height: number;
}
declare abstract class Texture<GL extends WebGLObject = WebGLObject> extends BindableGraphicsObject<Texture<GL>, GL> {
    readonly target: FramebufferTarget;
    protected data: TexImageSource | ArrayBufferView | Mipmap[] | Mipmap[][] | null;
    protected readonly pixelInternalFormat: PixelInternalFormat;
    protected readonly pixelFormat: PixelFormat;
    protected readonly pixelType: PixelType;
    readonly format: TextureFormat;
    width: number;
    height: number;
    static readonly bound: Null<Texture>;
    protected readonly identifier: string;
    protected constructor(width: number, height: number, format: TextureFormat, target: FramebufferTarget, genFn: () => GL | null, bindFn: (target: FramebufferTarget, handle: Null<GL>) => void, releaseFn: (handle: GL) => void);
    abstract apply(): void;
    static getPixelFormat(format: TextureFormat): PixelFormat;
    static getPixelInternalFormat(format: TextureFormat): PixelInternalFormat;
    static getPixelType(format: TextureFormat): PixelType;
}
export default Texture;
