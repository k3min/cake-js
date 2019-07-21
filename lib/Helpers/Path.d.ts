declare class Path {
    static getExtension(path: string): string;
    static getFileName(path: string, extension?: boolean): string;
}
export default Path;
