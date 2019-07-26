import { Disposable } from '../Core';
import { Drawable, PrimitiveType, VertexAttribute } from './Helpers';
import IndexBuffer from './IndexBuffer';
import VertexBuffer from './VertexBuffer';
import { BindableObject, Indexable, Null } from '../Core/Helpers';
declare class Mesh<T extends Indexable<VertexAttribute>> extends BindableObject<Mesh<T>> implements Drawable, Disposable {
    name: string;
    protected indexBuffer: Null<IndexBuffer>;
    protected vertexBuffer: Null<VertexBuffer<T>>;
    protected readonly identifier: string;
    protected binding(): void;
    protected unbinding(): void;
    draw(type?: PrimitiveType): void;
    protected disposing(): void;
}
export default Mesh;
