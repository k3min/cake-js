import Drawable from '../Helpers/Drawable';
import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
import PrimitiveType from './Helpers/PrimitiveType';
export declare enum BufferTarget {
    ElementArray,
    Array
}
export declare enum BufferUsage {
    Static,
    Dynamic
}
declare abstract class Buffer<T extends ArrayBuffer> extends BindableGraphicsObject<Buffer<T>, WebGLBuffer> implements Drawable {
    protected readonly data: T;
    private readonly target;
    private readonly usage;
    readonly length: number;
    static readonly bound: Null<Buffer<ArrayBuffer>>;
    protected constructor(target: BufferTarget, data: T, length: number, usage?: BufferUsage);
    apply(): void;
    static unbind(type: BufferTarget): void;
    abstract draw(type: PrimitiveType): void;
}
export default Buffer;
