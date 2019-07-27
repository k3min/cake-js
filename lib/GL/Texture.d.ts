import { Null } from '../Core/Helpers';
import { BindableGraphicsObject, PixelFormat, PixelType } from './Helpers';
import TextureFilterMode from './Helpers/TextureFilterMode';
import TextureWrapMode from './Helpers/TextureWrapMode';
export declare enum TextureFormat {
    Alpha8 = 0,
    RGB24 = 1,
    RGBA32 = 2,
    R5G6B5 = 3,
    R5G5B5A1 = 4,
    RGBA16 = 5,
    RGBAFloat = 6,
    Depth = 7,
    Depth16 = 8,
    Depth32 = 9,
    Stencil = 10,
    DepthStencil = 11
}
export interface Mipmap {
    data: Null<ArrayBufferView>;
    width: number;
    height: number;
}
export declare type CubeMapFace = Mipmap[];
export declare enum TextureTarget {
    Texture2D = 3553,
    CubeMap = 34067,
    RenderBuffer = 36161
}
declare type TextureData = TexImageSource | ArrayBufferView | Mipmap[] | CubeMapFace[];
declare abstract class Texture<T extends WebGLObject = WebGLObject> extends BindableGraphicsObject<Texture<T>, T> {
    name: string;
    readonly target: TextureTarget;
    private readonly parameters;
    protected data: Null<TextureData>;
    readonly format: TextureFormat;
    filterMode: TextureFilterMode;
    wrapMode: TextureWrapMode;
    protected readonly pixelFormat: PixelFormat;
    protected readonly pixelType: PixelType;
    mipmapCount: number;
    width: number;
    height: number;
    protected readonly identifier: string;
    protected constructor(width: number, height: number, format: TextureFormat, target: TextureTarget, genFn: () => Null<T>, bindFn: (handle: Null<T>) => void, releaseFn: (handle: T) => void);
    set(name: GLenum, value: GLenum): void;
    private setWrapMode;
    private setFilterMode;
    apply(): void;
}
export default Texture;
