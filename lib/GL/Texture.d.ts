import { Null } from '../Core/Helpers';
import { BindableGraphicsObject } from './Helpers';
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
    readonly format: GLenum;
    width: number;
    height: number;
    protected readonly identifier: string;
    protected constructor(width: number, height: number, format: GLenum, target: TextureTarget, genFn: () => Null<T>, bindFn: (handle: Null<T>) => void, releaseFn: (handle: T) => void);
    set(name: GLenum, value: GLenum): void;
    abstract apply(): void;
}
export default Texture;
