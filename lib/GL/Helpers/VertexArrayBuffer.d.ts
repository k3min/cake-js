import { Bindable } from '../../Core';
import { Indexable } from '../../Core/Helpers';
import VertexAttribute from './VertexAttribute';
declare class VertexArrayBuffer<T extends Indexable<VertexAttribute>> extends ArrayBuffer implements Bindable {
    private readonly stride;
    private readonly attributes;
    private readonly view;
    constructor(data: T[]);
    set(byteOffset: number, vertexAttribute: VertexAttribute): number;
    bind(): boolean;
    unbind(): boolean;
}
export default VertexArrayBuffer;
