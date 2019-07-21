import Null from '../Helpers/Null';
import Toggle from '../Helpers/Toggle';
declare type ToggleFn<T = void> = (cap: GLenum) => T;
declare type ExtensionFn = <T = any>(name: string) => Null<T>;
declare type ExtensionsFn = (...name: string[]) => void;
interface GraphicsContext extends WebGLRenderingContext {
    _enabled: Toggle<GLenum>;
    enableRaw: ToggleFn;
    disableRaw: ToggleFn;
    getExtensionRaw: ExtensionFn;
    getExtension: ExtensionFn;
    getExtensions: ExtensionsFn;
    enable: ToggleFn<boolean>;
    disable: ToggleFn;
    ext: WEBGL_draw_buffers;
    depth: WEBGL_depth_texture;
}
declare const _default: GraphicsContext;
export default _default;
