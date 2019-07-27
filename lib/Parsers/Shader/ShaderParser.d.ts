import ShaderCapabilities from './ShaderCapabilities';
declare class ShaderParser {
    private readonly raw;
    private section;
    private readonly includes;
    private readonly extensions;
    readonly keywords: string[][];
    readonly capabilities: ShaderCapabilities;
    readonly vertexSource: string[];
    readonly fragmentSource: string[];
    private parse;
    load(uri: string): Promise<void>;
    private apply;
    private parseDefine;
    private parseExtension;
    private parseInclude;
    private parseCapability;
    private parseSection;
}
export default ShaderParser;
