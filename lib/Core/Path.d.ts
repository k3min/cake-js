declare class Path {
    static readonly DIRECTORY_SEPARATOR: string;
    private static substr;
    static getFileName(path: string, extension?: boolean): string;
    static getExtension(path: string): string;
    static getDirectoryName(path: string): string;
    static combine(...paths: string[]): string;
}
export default Path;
