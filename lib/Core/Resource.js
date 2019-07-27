import { BinaryReader, TextReader } from './Helpers';
import Exception from './Exception';
import { Path } from './index';
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
        console.debug(`Resource: loading '${uri}'`);
        try {
            response = await fetch(Resource.url(uri), {
                method: 'GET',
                headers: {
                    'accept': type,
                },
            });
        }
        catch (e) {
            throw new Exception(`Resource: failed to load '${uri}'`, e);
        }
        return await Resource.parse(response, type);
    }
    static url(uri) {
        const origin = location.origin;
        const pathname = location.pathname;
        const url = new URL(`${origin}/${Path.combine(pathname, uri)}`);
        url.searchParams.append('timestamp', Date.now().toString());
        return url.toString();
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
