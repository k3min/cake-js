import TextReader from '../../Helpers/TextReader';
export declare enum ShaderSection {
    Global = "global",
    Vertex = "vertex",
    Fragment = "fragment"
}
declare class ShaderParser {
    private readonly raw;
    private section;
    private readonly extensions;
    readonly keywords: string[][];
    vertexSource: string[];
    fragmentSource: string[];
    private parseSource;
    static load(url: string): Promise<TextReader>;
    parse(reader: TextReader): Promise<void>;
    private generateKeywords;
    private parseDefine;
    private parseExtension;
    private parseInclude;
    private parseSection;
}
export default ShaderParser;
