import TextReader from './TextReader';
export declare enum ShaderSection {
    Global = "global",
    Vertex = "vertex",
    Fragment = "fragment"
}
declare class ShaderParser {
    private readonly raw;
    private section;
    readonly keywords: string[][];
    vertexSource: string[];
    fragmentSource: string[];
    private parseSource;
    static load(url: string): Promise<TextReader>;
    parse(reader: TextReader): Promise<void>;
    private generateKeywords;
    private parseDefine;
    private parseInclude;
    private parseSection;
}
export default ShaderParser;
