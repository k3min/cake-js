import { BinaryReader, TextReader } from './Helpers';
import Exception from './Exception';
export var ResourceType;
(function (ResourceType) {
    ResourceType["OBJ"] = "text/prs.wavefront-obj";
    ResourceType["GLSL"] = "application/x-glsl";
    ResourceType["DDS"] = "image/vnd-ms.dds";
    ResourceType["JSON"] = "application/json";
})(ResourceType || (ResourceType = {}));
class Resource {
    static async load(url, type) {
        let response;
        console.debug(`Resource: loading '${url}'`);
        try {
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'accept': type,
                },
            });
        }
        catch (e) {
            throw new Exception(`Resource: failed to load '${url}'`, e);
        }
        return await Resource.parse(response, type);
    }
    static async parse(response, type) {
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
