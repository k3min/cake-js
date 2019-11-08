import Mesh from '../GL/Mesh';
import { Intersectable, Ray, RayHit, Vector3 } from '../Math';
import Bounds from '../Math/Bounds';
import Triangle from '../Math/Triangle';
import { WavefrontParser, WavefrontVertex } from '../Parsers';
import { IndexBuffer, VertexBuffer } from '../GL';
import { Path, Exception } from '../Core';

class Model extends Mesh<WavefrontVertex> implements Intersectable {
	private readonly parser: WavefrontParser = new WavefrontParser();

	public readonly triangles: Triangle[] = [];
	public readonly bounds: Bounds = new Bounds(Vector3.zero, Vector3.zero);

	public static async load(uri: string): Promise<Model> {
		const model: Model = new Model();

		model.name = Path.getFileName(uri);

		try {
			await model.parser.load(uri);
		} catch (e) {
			throw new Exception(`Model: failed to load '${ uri }'`, e);
		}

		model.indexBuffer = new IndexBuffer(model.parser.indices);
		model.vertexBuffer = new VertexBuffer<WavefrontVertex>(model.parser.vertices);

		for (let i = 0; i < model.parser.indices.length; i += 3) {
			const v0: Vector3 = model.parser.vertices[model.parser.indices[i + 0]].position;
			const v1: Vector3 = model.parser.vertices[model.parser.indices[i + 1]].position;
			const v2: Vector3 = model.parser.vertices[model.parser.indices[i + 2]].position;

			model.bounds.encapsulate(v0);
			model.bounds.encapsulate(v1);
			model.bounds.encapsulate(v2);

			model.triangles.push(new Triangle(v0, v1, v2));
		}

		return model;
	}

	public intersect(ray: Ray): RayHit | false {
		const triangles: Triangle[] = this.triangles;

		for (let i = 0; i < triangles.length; i++) {
			const hit: RayHit | false = triangles[i].intersect(ray);

			if (hit !== false) {
				return hit;
			}
		}

		return false;
	}
}

export default Model;