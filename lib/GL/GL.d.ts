import { Null, Toggle, Omit } from '../Core/Helpers';
import Storage from '../Core/Helpers/Storage';
import Vector4 from '../Math/Vector4';
import { Capability } from './Helpers';
interface GraphicsContext extends Omit<WebGLRenderingContext, 'clear' | 'enable' | 'disable' | 'getExtension'> {
    _enabled: Toggle<Capability>;
    _extensions: Storage<any>;
    ext: WEBGL_draw_buffers;
    depth: WEBGL_depth_texture;
    clearRaw(mask: GLbitfield): void;
    enableRaw(cap: Capability): void;
    disableRaw(cap: Capability): void;
    getExtensionRaw<T = any>(name: string): Null<T>;
    getExtension<T = any>(name: string): Null<T>;
    requireExtension<T = any>(name: string): T;
    getExtensions(...name: string[]): void;
    enable(cap: Capability): boolean;
    disable(cap: Capability): void;
    clear(color?: Vector4 | boolean, depth?: GLclampf | boolean, stencil?: GLint | boolean): void;
    drawBuffers(buffers: GLenum[]): void;
}
declare const _default: GraphicsContext;
export default _default;
