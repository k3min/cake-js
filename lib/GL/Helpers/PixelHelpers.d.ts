import { TextureFormat } from '../Texture';
export declare enum PixelFormat {
    Depth = 6402,
    Alpha = 6406,
    RGB = 6407,
    RGBA = 6408,
    DepthStencil = 34041
}
export declare enum PixelType {
    Ubyte = 5121,
    Ushort = 5123,
    Uint = 5125,
    Float = 5126,
    Ushort4444 = 32819,
    Ushort5551 = 32820,
    Ushort565 = 33635,
    DepthStencil = 34042
}
export declare const pixelFormat: (format: TextureFormat) => PixelFormat;
export declare const pixelType: (format: TextureFormat) => PixelType;
export default TextureFormat;
