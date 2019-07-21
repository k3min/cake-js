import Toggle from '../Helpers/Toggle';

type ToggleFn<T = void> = (cap: GLenum) => T;
type ExtensionFn = (...name: string[]) => void;

interface GraphicsContext extends WebGLRenderingContext {
	enableRaw: ToggleFn,
	disableRaw: ToggleFn,
	getExtensions: ExtensionFn,
	enable: ToggleFn<boolean>,
	disable: ToggleFn,
	ext: WEBGL_draw_buffers,
	depth: WEBGL_depth_texture,
}

let enabled: Toggle<GLenum> = new Toggle<GLenum>();
let context: WebGLRenderingContext = document.createElement('canvas').getContext('webgl') as WebGLRenderingContext;

const enableRaw: ToggleFn = context.enable;
const disableRaw: ToggleFn = context.disable;

const ext: WEBGL_draw_buffers = context.getExtension('WEBGL_draw_buffers') as WEBGL_draw_buffers;
const depth: WEBGL_depth_texture = context.getExtension('WEBGL_depth_texture') as WEBGL_depth_texture;

const getExtensions: ExtensionFn = (...name: string[]): void => {
	for (let i = 0; i < name.length; i++) {
		const result = context.getExtension(name[i]);

		if (result === null) {
			throw new Error(`'${ name }' not supported!`);
		}
	}
};

const enable: ToggleFn<boolean> = (cap: GLenum): boolean => {
	const enable = enabled.set(cap, true);

	if (enable) {
		context.enable(cap);
	}

	return enable;
};

const disable: ToggleFn = (cap: GLenum): void => {
	if (enabled.set(cap, false)) {
		context.disable(cap);
	}
};

let gl: GraphicsContext = {
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