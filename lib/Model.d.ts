import Drawable from './Helpers/Drawable';
import BindableObject from './Helpers/BindableObject';
import VertexBuffer from './GL/VertexBuffer';
import IndexBuffer from './GL/IndexBuffer';
import { Indexable } from './GL/Helpers/VertexArrayBuffer';
import Disposable from './Helpers/Disposable';
import Null from './Helpers/Null';
declare class Model<I extends Indexable> extends BindableObject<Model<I>> implements Drawable, Disposable {
    name: string;
    protected vertices: VertexBuffer<I> | null;
    protected indices: Null<IndexBuffer>;
    protected readonly identifier: string;
    protected onBind(): void;
    protected onUnbind(): void;
    draw(type?: GLenum): void;
    dispose(): void;
}
export default Model;
