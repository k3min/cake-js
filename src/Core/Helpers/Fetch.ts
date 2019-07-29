import Log from '../Log';
import Path from '../Path';
import Storage from './Storage';

export enum ResponseType {
	ArrayBuffer = 'arraybuffer',
	Blob = 'blob',
	Document = 'document',
	JSON = 'json',
	Text = 'text'
}

const cache: Storage<any> = new Storage<any>();

const hash = (length: number = 20): string => {
	let result: string = '';

	for (let i = 0; i < (length >> 1); i++) {
		result += ((Math.random() * 255) | 0).toString(16).padStart(2, '0');
	}

	return result;
};

export const version = (uri: string): string => {
	const origin = location.origin;
	const pathname = location.pathname;

	const url: URL = new URL(`${ origin }/${ Path.combine(pathname, uri) }`);

	url.searchParams.append('id', hash());

	return url.toString();
};

const fetch = async (uri: string, type: ResponseType): Promise<any> => {
	return new Promise((resolve, reject) => {
		const response: any = cache.get(uri) as any;

		if (response) {
			resolve(response);
			return;
		}

		Log.debug(`Resource: loading '${ uri }'`);

		const xhr: XMLHttpRequest = new XMLHttpRequest();

		xhr.responseType = type;

		xhr.addEventListener('progress', (e: ProgressEvent): void => {
			Log.info(`Resource (${ uri }): ${ (e.loaded / e.total).toLocaleString(undefined, { style: 'percent' }) }`);
		});

		xhr.addEventListener('timeout', () => reject(), false);
		xhr.addEventListener('error', () => reject(), false);

		xhr.addEventListener('load', () => {
			const response: any = xhr.response;
			cache.set(uri, response);
			resolve(response);
		});

		xhr.open('GET', version(uri), true);

		xhr.setRequestHeader('Accept', type);

		xhr.send();
	});
};

export default fetch;