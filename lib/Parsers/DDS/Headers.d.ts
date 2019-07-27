import DXGIFormat from './DXGIFormat';
import { CubeMapFlags, HeaderFlags, PixelFormatFlags, SurfaceFlags } from './Flags';
import ResourceDimension from './ResourceDimension';
export interface PixelFormatHeader {
    readonly size: number;
    readonly flags: PixelFormatFlags;
    readonly fourCC: number;
    readonly rgbBitCount: number;
    readonly rBitMask: number;
    readonly gBitMask: number;
    readonly bBitMask: number;
    readonly aBitMask: number;
}
export interface DirectDrawSurfaceHeader {
    readonly size: number;
    readonly flags: HeaderFlags;
    readonly height: number;
    readonly width: number;
    readonly pitchOrLinearSize: number;
    readonly depth: number;
    readonly mipmapCount: number;
    readonly reserved1: number[];
    readonly pixelFormat: PixelFormatHeader;
    readonly surfaceFlags: SurfaceFlags;
    readonly cubeMapFlags: CubeMapFlags;
    readonly unused1: number;
    readonly unused2: number;
    readonly reserved2: number;
}
export interface DX10Header {
    readonly dxgiFormat: DXGIFormat;
    readonly resourceDimension: ResourceDimension;
    readonly miscFlag: number;
    readonly arraySize: number;
    readonly miscFlags2: number;
}
