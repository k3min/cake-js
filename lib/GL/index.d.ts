declare type ToggleFn<T = void> = (cap: GLenum) => T;
declare type ExtensionFn = (...name: string[]) => void;
interface GraphicsContext extends WebGLRenderingContext {
    enableRaw: ToggleFn;
    disableRaw: ToggleFn;
    getExtensions: ExtensionFn;
    enable: ToggleFn<boolean>;
    disable: ToggleFn;
    ext: WEBGL_draw_buffers;
    depth: WEBGL_depth_texture;
}
export { default as CubeMap } from './CubeMap';
export { default as Framebuffer } from './Framebuffer';
export { default as IndexBuffer } from './IndexBuffer';
export { default as Renderbuffer } from './Renderbuffer';
export { default as Texture2D } from './Texture2D';
export { default as VertexBuffer } from './VertexBuffer';
declare const _default: GraphicsContext;
export default _default;
