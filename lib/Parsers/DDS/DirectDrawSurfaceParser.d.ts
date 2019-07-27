import { BinaryReader } from '../../Core/Helpers';
import { TextureFormat } from '../../GL';
import { DirectDrawSurfaceHeader, DX10Header } from './Headers';
export declare const MAGIC = 542327876;
declare class DirectDrawSurfaceParser {
    readonly reader: BinaryReader;
    readonly ddsHeader: DirectDrawSurfaceHeader;
    readonly dx10Header?: DX10Header;
    readonly isDX10: boolean;
    readonly mipmapCount: number;
    readonly width: number;
    readonly height: number;
    readonly textureFormat: TextureFormat;
    private constructor();
    static load(uri: string): Promise<DirectDrawSurfaceParser>;
    private validate;
    static fourCC(value: string): number;
}
export default DirectDrawSurfaceParser;
