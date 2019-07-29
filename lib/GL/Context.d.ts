/// <reference types="webgl2" />
import { Null, Toggle, Omit, Storage } from '../Core/Helpers';
import { Vector4 } from '../Math';
import { Capability } from './Helpers';
export declare enum ContextError {
    None = 0,
    InvalidEnum = 1280,
    InvalidValue = 1281,
    InvalidOperation = 1282,
    OutOfMemory = 1285,
    InvalidFramebufferOperation = 1286
}
declare type Override = 'clear' | 'enable' | 'disable' | 'getExtension' | 'getError' | 'drawBuffers';
declare type RenderingContext = WebGLRenderingContext & WebGL2RenderingContext;
interface Context extends Omit<RenderingContext, Override> {
    readonly _enabled: Toggle<Capability>;
    readonly _extensions: Storage<any>;
    readonly ext?: WEBGL_draw_buffers;
    readonly isWebGL2: boolean;
    getErrorRaw(): GLenum;
    drawBuffersRaw?(buffers: GLenum[]): void;
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
