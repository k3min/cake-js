import Toggle from '../Helpers/Toggle';
let enabled = new Toggle();
let context = document.createElement('canvas').getContext('webgl');
const enableRaw = context.enable;
const disableRaw = context.disable;
const ext = context.getExtension('WEBGL_draw_buffers');
const depth = context.getExtension('WEBGL_depth_texture');
const getExtensions = (...name) => {
    for (let i = 0; i < name.length; i++) {
        const result = context.getExtension(name[i]);
        if (result === null) {
            throw new Error(`'${name}' not supported!`);
        }
    }
};
const enable = (cap) => {
    const enable = enabled.set(cap, true);
    if (enable) {
        context.enable(cap);
    }
    return enable;
};
const disable = (cap) => {
    if (enabled.set(cap, false)) {
        context.disable(cap);
    }
};
let gl = {
    ...context,
    enableRaw,
    disableRaw,
    getExtensions,
    enable,
    disable,
    ext,
    depth,
};
export { default as CubeMap } from './CubeMap';
export { default as Framebuffer } from './Framebuffer';
export { default as IndexBuffer } from './IndexBuffer';
export { default as Renderbuffer } from './Renderbuffer';
export { default as Texture2D } from './Texture2D';
export { default as VertexBuffer } from './VertexBuffer';
export default gl;
