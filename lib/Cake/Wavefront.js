import WavefrontParser from '../GL/Helpers/WavefrontParser';
import IndexBuffer from '../GL/IndexBuffer';
import Model from '../GL/Model';
import VertexBuffer from '../GL/VertexBuffer';
import Path from '../Helpers/Path';
class Wavefront extends Model {
    constructor() {
        super(...arguments);
        this.parser = new WavefrontParser();
    }
    static async load(url) {
        const model = new Wavefront();
        model.name = Path.getFileName(url);
        await model.parser.load(url);
        model.indexBuffer = new IndexBuffer(model.parser.indices);
        model.vertexBuffer = new VertexBuffer(model.parser.vertices);
        return model;
    }
}
export default Wavefront;
