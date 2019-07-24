export declare enum ShaderSection {
    Global = "global",
    Vertex = "vertex",
    Fragment = "fragment"
}
declare class ShaderParser {
    private readonly raw;
    private section;
    private readonly includes;
    private readonly extensions;
    readonly keywords: string[][];
    readonly vertexSource: string[];
    readonly fragmentSource: string[];
    private parse;
    load(url: string): Promise<void>;
    private apply;
    private parseDefine;
    private parseExtension;
    private parseInclude;
    private parseSection;
}
export default ShaderParser;
