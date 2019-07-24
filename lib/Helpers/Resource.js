import BinaryReader from './BinaryReader';
import TextReader from './TextReader';
export var ResourceType;
(function (ResourceType) {
    ResourceType["OBJ"] = "text/prs.wavefront-obj";
    ResourceType["GLSL"] = "application/x-glsl";
    ResourceType["DDS"] = "image/vnd-ms.dds";
    ResourceType["JSON"] = "application/json";
})(ResourceType || (ResourceType = {}));
class Resource {
    static async load(url, type) {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': type,
            },
        });
        switch (type) {
            case ResourceType.DDS:
                return new BinaryReader(await response.arrayBuffer());
            case ResourceType.OBJ:
            case ResourceType.GLSL:
                return new TextReader(await response.text());
            case ResourceType.JSON:
                return await response.json();
            default:
                throw new RangeError();
        }
    }
}
export default Resource;
