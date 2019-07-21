import BinaryReader from './BinaryReader';
import TextReader from './TextReader';
export declare enum ResourceType {
    OBJ = "text/prs.wavefront-obj",
    GLSL = "application/x-glsl",
    DDS = "image/vnd-ms.dds"
}
declare class Resource {
    static load<T extends BinaryReader | TextReader>(url: string, type: ResourceType): Promise<T>;
}
export default Resource;
