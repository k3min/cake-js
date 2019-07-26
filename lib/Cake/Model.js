import Mesh from '../GL/Mesh';
import { WavefrontParser } from '../Parsers';
import { IndexBuffer, VertexBuffer } from '../GL';
import { Path, Exception } from '../Core';
class Model extends Mesh {
    constructor() {
        super(...arguments);
        this.parser = new WavefrontParser();
    }
    static async load(url) {
        const model = new Model();
        model.name = Path.getFileName(url);
        try {
            await model.parser.load(url);
        }
        catch (e) {
            throw new Exception(`Model: failed to load '${url}'`, e);
        }
        model.indexBuffer = new IndexBuffer(model.parser.indices);
        model.vertexBuffer = new VertexBuffer(model.parser.vertices);
        return model;
    }
}
export default Model;
