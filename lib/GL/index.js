import Toggle from '../Helpers/Toggle';
class GL {
    constructor() {
        this.enabled = new Toggle();
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('webgl');
        this.ext = this.context.getExtension('WEBGL_draw_buffers');
        this.depth = this.context.getExtension('WEBGL_depth_texture');
    }
    static get export() {
        const { context: { enable: enableRaw, disable: disableRaw, canvas: _canvas, ...context }, canvas, getExtensions, enable, disable, ext, depth, } = new GL();
        return {
            ...context,
            canvas,
            enableRaw,
            disableRaw,
            getExtensions,
            enable,
            disable,
            ext,
            depth,
        };
    }
    getExtensions(...name) {
        for (let i = 0; i < name.length; i++) {
            const result = this.context.getExtension(name[i]);
            if (result === null) {
                throw new Error(`'${name}' not supported!`);
            }
        }
    }
    enable(cap) {
        const enable = this.enabled.set(cap, true);
        if (enable) {
            this.context.enable(cap);
        }
        return enable;
    }
    disable(cap) {
        if (this.enabled.set(cap, false)) {
            this.context.disable(cap);
        }
    }
}
if (!('gl' in window)) {
    Object.defineProperty(window, 'gl', {
        value: GL.export,
    });
}
export { default as CubeMap } from './CubeMap';
export { default as Framebuffer } from './Framebuffer';
export { default as IndexBuffer } from './IndexBuffer';
export { default as Renderbuffer } from './Renderbuffer';
export { default as Texture2D } from './Texture2D';
export { default as VertexBuffer } from './VertexBuffer';
export default window.gl;
