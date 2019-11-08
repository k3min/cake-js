import 'reflect-metadata';
import Metadata from './Metadata';
interface RangeMetadata {
    min: number;
    max: number;
    step: number;
}
export declare const range: (metadata: RangeMetadata) => Metadata;
declare class Range implements RangeMetadata {
    static readonly SYMBOL: string;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    private constructor();
    static get(target: any, property: string): Range;
    static all(target: any): Range[];
}
export default Range;
