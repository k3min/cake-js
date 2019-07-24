import Null from '../Helpers/Null';
import Drawable, { PrimitiveType } from './Helpers/Drawable';
import VertexAttribute from './Helpers/VertexAttribute';
import IndexBuffer from './IndexBuffer';
import VertexBuffer from './VertexBuffer';
import BindableObject from '../Helpers/BindableObject';
import Disposable from '../Helpers/Disposable';
import Indexable from '../Helpers/Indexable';
declare class Model<T extends Indexable<VertexAttribute>> extends BindableObject<Model<T>> implements Drawable, Disposable {
    name: string;
    protected indexBuffer: Null<IndexBuffer>;
    protected vertexBuffer: Null<VertexBuffer<T>>;
    protected readonly identifier: string;
    protected onBind(): void;
    protected onUnbind(): void;
    draw(type?: PrimitiveType): void;
    protected disposing(): void;
}
export default Model;
