import { WavefrontParser } from '../Parsers';
import { Mesh, IndexBuffer, VertexBuffer } from '../GL';
import { Path } from '../Helpers';
class Model extends Mesh {
    constructor() {
        super(...arguments);
        this.parser = new WavefrontParser();
    }
    static async load(url) {
        const model = new Model();
        model.name = Path.getFileName(url);
        await model.parser.load(url);
        model.indexBuffer = new IndexBuffer(model.parser.indices);
        model.vertexBuffer = new VertexBuffer(model.parser.vertices);
        return model;
    }
}
export default Model;
