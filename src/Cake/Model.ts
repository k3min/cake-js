import Mesh from '../GL/Mesh';
import { WavefrontParser, WavefrontVertex } from '../Parsers';
import { IndexBuffer, VertexBuffer } from '../GL';
import { Path, Exception } from '../Core';

class Model extends Mesh<WavefrontVertex> {
	private readonly parser: WavefrontParser = new WavefrontParser();

	public static async load(url: string): Promise<Model> {
		const model: Model = new Model();

		model.name = Path.getFileName(url);

		try {
			await model.parser.load(url);
		} catch (e) {
			throw new Exception(`Model: failed to load '${ url }'`, e);
		}

		model.indexBuffer = new IndexBuffer(model.parser.indices);
		model.vertexBuffer = new VertexBuffer<WavefrontVertex>(model.parser.vertices);

		return model;
	}
}

export default Model;