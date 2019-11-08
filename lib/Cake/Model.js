import Mesh from '../GL/Mesh';
import { Vector3 } from '../Math';
import Bounds from '../Math/Bounds';
import Triangle from '../Math/Triangle';
import { WavefrontParser } from '../Parsers';
import { IndexBuffer, VertexBuffer } from '../GL';
import { Path, Exception } from '../Core';
class Model extends Mesh {
    constructor() {
        super(...arguments);
        this.parser = new WavefrontParser();
        this.triangles = [];
        this.bounds = new Bounds(Vector3.zero, Vector3.zero);
    }
    static async load(uri) {
        const model = new Model();
        model.name = Path.getFileName(uri);
        try {
            await model.parser.load(uri);
        }
        catch (e) {
            throw new Exception(`Model: failed to load '${uri}'`, e);
        }
        model.indexBuffer = new IndexBuffer(model.parser.indices);
        model.vertexBuffer = new VertexBuffer(model.parser.vertices);
        for (let i = 0; i < model.parser.indices.length; i += 3) {
            const v0 = model.parser.vertices[model.parser.indices[i + 0]].position;
            const v1 = model.parser.vertices[model.parser.indices[i + 1]].position;
            const v2 = model.parser.vertices[model.parser.indices[i + 2]].position;
            model.bounds.encapsulate(v0);
            model.bounds.encapsulate(v1);
            model.bounds.encapsulate(v2);
            model.triangles.push(new Triangle(v0, v1, v2));
        }
        return model;
    }
    intersect(ray) {
        const triangles = this.triangles;
        for (let i = 0; i < triangles.length; i++) {
            const hit = triangles[i].intersect(ray);
            if (hit !== false) {
                return hit;
            }
        }
        return false;
    }
}
export default Model;
