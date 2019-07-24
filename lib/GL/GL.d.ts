import { Null, Toggle } from '../Helpers';
interface GraphicsContext extends WebGLRenderingContext {
    _enabled: Toggle<GLenum>;
    ext: WEBGL_draw_buffers;
    depth: WEBGL_depth_texture;
    enableRaw(cap: GLenum): void;
    disableRaw(cap: GLenum): void;
    getExtensionRaw<T = any>(name: string): Null<T>;
    getExtension<T = any>(name: string): T;
    getExtensions(...name: string[]): void;
    enable(cap: GLenum): boolean;
    disable(cap: GLenum): void;
}
declare const _default: GraphicsContext;
export default _default;
