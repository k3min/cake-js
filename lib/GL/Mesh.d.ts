import { Disposable } from '../Core';
import { Drawable, PrimitiveType } from './Helpers';
import IndexBuffer from './IndexBuffer';
import VertexBuffer from './VertexBuffer';
import { BindableObject, Indexable, Null } from '../Core/Helpers';
declare class Mesh<T extends Indexable<ArrayLike<number>>> extends BindableObject<Mesh<T>> implements Drawable, Disposable {
    name: string;
    protected indexBuffer: Null<IndexBuffer>;
    protected vertexBuffer: Null<VertexBuffer<T>>;
    protected readonly identifier: string;
    protected binding(): void;
    protected unbinding(): void;
    draw(type?: PrimitiveType): void;
    drawInstanced(type: PrimitiveType, count: number): void;
    protected disposing(): void;
}
export default Mesh;
