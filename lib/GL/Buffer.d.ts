import { PrimitiveType, Drawable, BindableGraphicsObject } from './Helpers';
export declare enum BufferType {
    Array = 34962,
    ElementArray = 34963
}
/**
 * @todo Implement observable pattern
 */
declare abstract class Buffer<T extends ArrayBuffer> extends BindableGraphicsObject<Buffer<T>, WebGLBuffer> implements Drawable {
    name: string;
    protected readonly data: T;
    private readonly target;
    readonly length: number;
    protected readonly identifier: string;
    protected constructor(target: BufferType, data: T, length: number);
    /**
     * @todo Context.DYNAMIC_DRAW
     */
    apply(): void;
    abstract draw(type: PrimitiveType): void;
    abstract drawInstanced(type: PrimitiveType, count: number): void;
}
export default Buffer;
