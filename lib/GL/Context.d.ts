import { Null, Toggle, Omit } from '../Core/Helpers';
import Storage from '../Core/Helpers/Storage';
import Vector4 from '../Math/Vector4';
import { Capability } from './Helpers';
export declare enum ContextError {
    None = 0,
    InvalidEnum = 1280,
    InvalidValue = 1281,
    InvalidOperation = 1282,
    OutOfMemory = 1285,
    InvalidFramebufferOperation = 1286
}
interface Context extends Omit<WebGLRenderingContext, 'clear' | 'enable' | 'disable' | 'getExtension'> {
    _enabled: Toggle<Capability>;
    _extensions: Storage<any>;
    ext: WEBGL_draw_buffers;
    depth: WEBGL_depth_texture;
    getErrorRaw(): GLenum;
    clearRaw(mask: GLbitfield): void;
    enableRaw(cap: Capability): void;
    disableRaw(cap: Capability): void;
    getExtensionRaw<T = any>(name: string): Null<T>;
    getExtension<T = any>(name: string): Null<T>;
    requireExtension<T = any>(name: string): T;
    getExtensions(names: string[]): void;
    enable(cap: Capability): boolean;
    disable(cap: Capability): void;
    clear(color?: Vector4 | boolean, depth?: GLclampf | boolean, stencil?: GLint | boolean): void;
    drawBuffers(buffers: GLenum[]): void;
    enumToString(value: GLenum): string[];
    getError(): ContextError;
}
declare const _default: Context;
export default _default;
