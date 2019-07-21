import Drawable from '../Helpers/Drawable';
import Null from '../Helpers/Null';
import BindableGraphicsObject from './Helpers/BindableGraphicsObject';
declare abstract class Buffer<T extends ArrayBuffer> extends BindableGraphicsObject<Buffer<T>, WebGLBuffer> implements Drawable {
    protected readonly data: T;
    private readonly target;
    readonly length: number;
    static readonly bound: Null<Buffer<ArrayBuffer>>;
    protected constructor(target: GLenum, data: T, length: number);
    apply(): void;
    static unbind(type: GLenum): void;
    abstract draw(type: GLenum): void;
}
export default Buffer;
