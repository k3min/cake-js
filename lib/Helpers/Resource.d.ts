import BinaryReader from './BinaryReader';
import Indexable from './Indexable';
import TextReader from './TextReader';
export declare enum ResourceType {
    OBJ = "text/prs.wavefront-obj",
    GLSL = "application/x-glsl",
    DDS = "image/vnd-ms.dds",
    JSON = "application/json"
}
declare class Resource {
    static load<T extends BinaryReader | TextReader | Indexable<any> | ArrayLike<any>>(url: string, type: ResourceType): Promise<T>;
}
export default Resource;
