import Drawable from './Helpers/Drawable';
import BindableObject from './Helpers/BindableObject';
import VertexBuffer from './GL/VertexBuffer';
import IndexBuffer from './GL/IndexBuffer';
import { Indexable } from './GL/Helpers/VertexArrayBuffer';
import Disposable from './Helpers/Disposable';
declare class Model<T extends Indexable> extends BindableObject<Model<T>> implements Drawable, Disposable {
    name: string;
    protected vertices?: VertexBuffer<T>;
    protected indices?: IndexBuffer;
    protected readonly identifier: string;
    afterBind(): void;
    afterUnbind(): void;
    draw(type?: GLenum): void;
    dispose(): void;
}
export default Model;
