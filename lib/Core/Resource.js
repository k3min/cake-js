import { BinaryReader, TextReader, fetch, ResponseType } from './Helpers';
import Exception from './Exception';
export var ResourceType;
(function (ResourceType) {
    ResourceType["OBJ"] = "text/prs.wavefront-obj";
    ResourceType["GLSL"] = "application/x-glsl";
    ResourceType["DDS"] = "image/vnd-ms.dds";
    ResourceType["JSON"] = "application/json";
})(ResourceType || (ResourceType = {}));
class Resource {
    static async load(uri, type) {
        let response;
        try {
            response = await fetch(uri, Resource.responseType(type));
        }
        catch (e) {
            throw new Exception(`Resource: failed to load '${uri}'`, e);
        }
        return await Resource.parse(response, type);
    }
    static responseType(type) {
        switch (type) {
            case ResourceType.DDS:
                return ResponseType.ArrayBuffer;
            case ResourceType.OBJ:
            case ResourceType.GLSL:
                return ResponseType.Text;
            case ResourceType.JSON:
                return ResponseType.JSON;
        }
    }
    static parse(response, type) {
        switch (type) {
            case ResourceType.DDS:
                return new BinaryReader(response);
            case ResourceType.OBJ:
            case ResourceType.GLSL:
                return new TextReader(response);
            case ResourceType.JSON:
                return response;
        }
    }
}
export default Resource;
