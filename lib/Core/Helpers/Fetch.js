import Log from '../Log';
import Path from '../Path';
import Storage from './Storage';
export var ResponseType;
(function (ResponseType) {
    ResponseType["ArrayBuffer"] = "arraybuffer";
    ResponseType["Blob"] = "blob";
    ResponseType["Document"] = "document";
    ResponseType["JSON"] = "json";
    ResponseType["Text"] = "text";
})(ResponseType || (ResponseType = {}));
const cache = new Storage();
const hash = (length = 20) => {
    let result = '';
    for (let i = 0; i < (length >> 1); i++) {
        result += ((Math.random() * 255) | 0).toString(16).padStart(2, '0');
    }
    return result;
};
export const version = (uri) => {
    const origin = location.origin;
    const pathname = location.pathname;
    const url = new URL(`${origin}/${Path.combine(pathname, uri)}`);
    url.searchParams.append('id', hash());
    return url.toString();
};
const fetch = async (uri, type) => {
    return new Promise((resolve, reject) => {
        const response = cache.get(uri);
        if (response) {
            resolve(response);
            return;
        }
        Log.debug(`Resource: loading '${uri}'`);
        const xhr = new XMLHttpRequest();
        xhr.responseType = type;
        xhr.addEventListener('progress', (e) => {
            Log.info(`Resource (${uri}): ${(e.loaded / e.total).toLocaleString(undefined, { style: 'percent' })}`);
        });
        xhr.addEventListener('timeout', () => reject(), false);
        xhr.addEventListener('error', () => reject(), false);
        xhr.addEventListener('load', () => {
            const response = xhr.response;
            cache.set(uri, response);
            resolve(response);
        });
        xhr.open('GET', version(uri), true);
        xhr.setRequestHeader('Accept', type);
        xhr.send();
    });
};
export default fetch;
