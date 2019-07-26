import { BinaryReader, Indexable, TextReader } from './Helpers';
import Exception from './Exception';

type Resourceable = BinaryReader | TextReader | Indexable<any> | ArrayLike<any>;

export enum ResourceType {
	OBJ = 'text/prs.wavefront-obj',
	GLSL = 'application/x-glsl',
	DDS = 'image/vnd-ms.dds',
	JSON = 'application/json',
}

class Resource {
	public static async load<T extends Resourceable>(url: string, type: ResourceType): Promise<T> {
		let response: Response;

		console.debug(`Resource: loading '${ url }'`);

		try {
			response = await fetch(url, {
				method: 'GET',
				headers: {
					'accept': type,
				},
			});
		} catch (e) {
			throw new Exception(`Resource: failed to load '${ url }'`, e);
		}

		return await Resource.parse<T>(response, type);
	}

	private static async parse<T extends Resourceable>(response: Response, type: ResourceType): Promise<T> {
		switch (type) {
			case ResourceType.DDS:
				return new BinaryReader(await response.arrayBuffer()) as T;

			case ResourceType.OBJ:
			case ResourceType.GLSL:
				return new TextReader(await response.text()) as T;

			case ResourceType.JSON:
				return await response.json() as T;

			default:
				throw new RangeError();
		}
	}
}

export default Resource;