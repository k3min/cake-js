import { BinaryReader, Indexable, TextReader } from './Helpers';
declare type Resourceable = BinaryReader | TextReader | Indexable<any> | ArrayLike<any>;
export declare enum ResourceType {
    OBJ = "text/prs.wavefront-obj",
    GLSL = "application/x-glsl",
    DDS = "image/vnd-ms.dds",
    JSON = "application/json"
}
declare class Resource {
    static load<T extends Resourceable>(url: string, type: ResourceType): Promise<T>;
    private static parse;
}
export default Resource;
