import { WavefrontParser, WavefrontVertex } from '../Parsers';
import { Mesh, IndexBuffer, VertexBuffer } from '../GL';
import { Path } from '../Helpers';

class Model extends Mesh<WavefrontVertex> {
	private readonly parser: WavefrontParser = new WavefrontParser();

	public static async load(url: string): Promise<Model> {
		const model: Model = new Model();

		model.name = Path.getFileName(url);

		await model.parser.load(url);

		model.indexBuffer = new IndexBuffer(model.parser.indices);
		model.vertexBuffer = new VertexBuffer<WavefrontVertex>(model.parser.vertices);

		return model;
	}
}

export default Model;