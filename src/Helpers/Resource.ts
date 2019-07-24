import BinaryReader from './BinaryReader';
import Indexable from './Indexable';
import TextReader from './TextReader';

export enum ResourceType {
	OBJ = 'text/prs.wavefront-obj',
	GLSL = 'application/x-glsl',
	DDS = 'image/vnd-ms.dds',
	JSON = 'application/json',
}

class Resource {
	public static async load<T extends BinaryReader | TextReader | Indexable<any> | ArrayLike<any>>(url: string, type: ResourceType): Promise<T> {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'accept': type,
			},
		});

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