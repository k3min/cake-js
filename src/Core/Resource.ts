import { BinaryReader, Indexable, TextReader, fetch, ResponseType } from './Helpers';
import Exception from './Exception';

type Resourceable = BinaryReader | TextReader | Indexable<any> | ArrayLike<any>;

export enum ResourceType {
	OBJ = 'text/prs.wavefront-obj',
	GLSL = 'application/x-glsl',
	DDS = 'image/vnd-ms.dds',
	JSON = 'application/json',
}

class Resource {
	public static async load<T extends Resourceable>(uri: string, type: ResourceType): Promise<T> {
		let response: any;

		try {
			response = await fetch(uri, Resource.responseType(type));
		} catch (e) {
			throw new Exception(`Resource: failed to load '${ uri }'`, e);
		}

		return await Resource.parse<T>(response, type);
	}

	private static responseType(type: ResourceType): ResponseType {
		switch (type) {
			case ResourceType.DDS:
				return ResponseType.ArrayBuffer;

			case ResourceType.OBJ:
			case ResourceType.GLSL:
				return ResponseType.Text;

			case ResourceType.JSON:
				return ResponseType.JSON;
		}
	}

	private static parse<T extends Resourceable>(response: any, type: ResourceType): T {
		switch (type) {
			case ResourceType.DDS:
				return new BinaryReader(response) as T;

			case ResourceType.OBJ:
			case ResourceType.GLSL:
				return new TextReader(response) as T;

			case ResourceType.JSON:
				return response as T;
		}
	}
}

export default Resource;