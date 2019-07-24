import Bindable from '../../Helpers/Bindable';
import Indexable from '../../Helpers/Indexable';
import VertexAttribute from './VertexAttribute';
declare class VertexArrayBuffer<T extends Indexable<VertexAttribute>> extends ArrayBuffer implements Bindable {
    private readonly bytesPerElement;
    private readonly attributes;
    private readonly view;
    constructor(data: T[]);
    static getBytesPerElement<T extends Indexable<VertexAttribute>>(item: T): number;
    set(byteOffset: number, vertexAttribute: VertexAttribute): number;
    bind(): boolean;
    unbind(): boolean;
}
export default VertexArrayBuffer;
