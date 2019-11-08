import 'reflect-metadata';
import DataType from './DataType';
import { Metadata, Indexable } from '../../Core/Helpers';
interface VertexAttributeMetadata {
    location: number;
    type: DataType;
    normalized: boolean;
}
export declare const vertexAttribute: (metadata: VertexAttributeMetadata) => Metadata;
declare class VertexAttribute implements VertexAttributeMetadata {
    static readonly SYMBOL: string;
    readonly location: number;
    readonly data: ArrayLike<number>;
    readonly type: DataType;
    readonly length: number;
    readonly bytesPerElement: number;
    readonly stride: number;
    readonly normalized: boolean;
    readonly littleEndian: boolean;
    private constructor();
    static get(vertex: Indexable<ArrayLike<number>>, name: string): VertexAttribute;
}
export default VertexAttribute;
