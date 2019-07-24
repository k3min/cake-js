import WavefrontParser, { Vertex } from '../GL/Helpers/WavefrontParser';
import IndexBuffer from '../GL/IndexBuffer';
import Model from '../GL/Model';
import VertexBuffer from '../GL/VertexBuffer';
import Path from '../Helpers/Path';

class Wavefront extends Model<Vertex> {
	private readonly parser: WavefrontParser = new WavefrontParser();

	public static async load(url: string): Promise<Wavefront> {
		const model: Wavefront = new Wavefront();

		model.name = Path.getFileName(url);

		await model.parser.load(url);

		model.indexBuffer = new IndexBuffer(model.parser.indices);
		model.vertexBuffer = new VertexBuffer<Vertex>(model.parser.vertices);

		return model;
	}
}

export default Wavefront;