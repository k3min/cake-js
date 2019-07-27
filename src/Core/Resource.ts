import { BinaryReader, Indexable, TextReader } from './Helpers';
import Exception from './Exception';
import { Path } from './index';

type Resourceable = BinaryReader | TextReader | Indexable<any> | ArrayLike<any>;

export enum ResourceType {
	OBJ = 'text/prs.wavefront-obj',
	GLSL = 'application/x-glsl',
	DDS = 'image/vnd-ms.dds',
	JSON = 'application/json',
}

class Resource {
	public static async load<T extends Resourceable>(uri: string, type: ResourceType): Promise<T> {
		let response: Response;

		console.debug(`Resource: loading '${ uri }'`);

		try {

			response = await fetch(Resource.url(uri), {
				method: 'GET',
				headers: {
					'accept': type,
				},
			});
		} catch (e) {
			throw new Exception(`Resource: failed to load '${ uri }'`, e);
		}

		return await Resource.parse<T>(response, type);
	}

	public static url(uri: string): string {
		const origin = location.origin;
		const pathname = location.pathname;

		const url: URL = new URL(`${ origin }/${ Path.combine(pathname, uri) }`);

		url.searchParams.append('timestamp', Date.now().toString());

		return url.toString();
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