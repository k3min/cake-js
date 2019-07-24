import { Bindable, Indexable } from '../../Helpers';
import VertexAttribute from './VertexAttribute';
declare class VertexArrayBuffer<T extends Indexable<VertexAttribute>> extends ArrayBuffer implements Bindable {
    private readonly bytesPerElement;
    private readonly attributes;
    private readonly view;
    constructor(data: T[]);
    set(byteOffset: number, vertexAttribute: VertexAttribute): number;
    bind(): boolean;
    unbind(): boolean;
}
export default VertexArrayBuffer;
