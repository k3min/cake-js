import Drawable, { PrimitiveType } from './Helpers/Drawable';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
export declare enum BufferType {
    Array = 34962,
    ElementArray = 34963
}
declare abstract class Buffer<T extends ArrayBuffer> extends BindableGraphicsObject<Buffer<T>, WebGLBuffer> implements Drawable {
    name: string;
    protected readonly data: T;
    private readonly target;
    readonly length: number;
    protected readonly identifier: string;
    protected constructor(target: BufferType, data: T, length: number);
    apply(): void;
    abstract draw(type: PrimitiveType): void;
}
export default Buffer;
