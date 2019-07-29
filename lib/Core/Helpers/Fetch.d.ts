export declare enum ResponseType {
    ArrayBuffer = "arraybuffer",
    Blob = "blob",
    Document = "document",
    JSON = "json",
    Text = "text"
}
export declare const version: (uri: string) => string;
declare const fetch: (uri: string, type: ResponseType) => Promise<any>;
export default fetch;
