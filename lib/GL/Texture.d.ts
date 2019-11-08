import { Null } from '../Core/Helpers';
import { Vector4 } from '../Math';
import { BindableGraphicsObject, Pixel } from './Helpers';
import TextureFilterMode from './Helpers/TextureFilterMode';
import TextureWrapMode from './Helpers/TextureWrapMode';
export declare enum TextureFormat {
    ARGB32 = 0,
    Depth = 1,
    ARGBHalf = 2,
    RGB565 = 3,
    ARGB4444 = 4,
    ARGB1555 = 5,
    ARGB2101010 = 6,
    ARGBFloat = 7,
    RGFloat = 8,
    RGHalf = 9,
    RFloat = 10,
    RHalf = 11,
    R8 = 12,
    RGB111110Float = 13,
    RG16 = 14
}
export interface Mipmap {
    data: Null<ArrayBufferView>;
    width: number;
    height: number;
}
export declare type CubeMapFace = Mipmap[];
export declare enum TextureTarget {
    Texture2D = 3553,
    Texture2DArray = 35866,
    CubeMap = 34067,
    RenderBuffer = 36161
}
declare type TextureData = TexImageSource | ArrayBufferView | Mipmap[] | CubeMapFace[];
/**
 * @todo Implement observable pattern
 */
declare abstract class Texture<T extends WebGLObject = WebGLObject> extends BindableGraphicsObject<Texture<T>, T> {
    name: string;
    readonly target: TextureTarget;
    private readonly parameters;
    data: Null<TextureData>;
    readonly format: TextureFormat;
    filterMode: TextureFilterMode;
    wrapMode: TextureWrapMode;
    protected readonly pixel: Pixel;
    mipmapCount: number;
    width: number;
    height: number;
    readonly texelSize: Vector4;
    protected readonly identifier: string;
    protected constructor(width: number, height: number, format: TextureFormat, target: TextureTarget, genFn: () => Null<T>, bindFn: (handle: Null<T>) => void, releaseFn: (handle: T) => void);
    set(name: GLenum, value: GLenum): void;
    private setWrapMode;
    private setFilterMode;
    apply(): void;
}
export default Texture;
