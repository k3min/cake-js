import { Drawable, PrimitiveType, VertexAttribute } from './Helpers';
import IndexBuffer from './IndexBuffer';
import VertexBuffer from './VertexBuffer';
import { BindableObject, Disposable, Indexable, Null } from '../Helpers';
declare class Mesh<T extends Indexable<VertexAttribute>> extends BindableObject<Mesh<T>> implements Drawable, Disposable {
    name: string;
    protected indexBuffer: Null<IndexBuffer>;
    protected vertexBuffer: Null<VertexBuffer<T>>;
    protected readonly identifier: string;
    protected onBind(): void;
    protected onUnbind(): void;
    draw(type?: PrimitiveType): void;
    protected disposing(): void;
}
export default Mesh;
