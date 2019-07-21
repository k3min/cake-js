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

class GL {
	private readonly enabled: Toggle<GLenum> = new Toggle<GLenum>();

	public readonly context: WebGLRenderingContext;
	public readonly ext: WEBGL_draw_buffers;
	public readonly depth: WEBGL_depth_texture;

	public static get export(): GraphicsContext {
		const {
			context: {
				enable: enableRaw,
				disable: disableRaw,
				...context
			},
			getExtensions,
			enable,
			disable,
			ext,
			depth,
		} = new GL();

		return {
			...context,
			enableRaw,
			disableRaw,
			getExtensions,
			enable,
			disable,
			ext,
			depth,
		};
	}

	public constructor() {
		this.context = document.createElement('canvas').getContext('webgl') as WebGLRenderingContext;
		this.ext = this.context.getExtension('WEBGL_draw_buffers') as WEBGL_draw_buffers;
		this.depth = this.context.getExtension('WEBGL_depth_texture') as WEBGL_depth_texture;
	}

	public getExtensions(...name: string[]): void {
		for (let i = 0; i < name.length; i++) {
			const result = this.context.getExtension(name[i]);

			if (result === null) {
				throw new Error(`'${ name }' not supported!`);
			}
		}
	}

	public enable(cap: GLenum): boolean {
		const enable = this.enabled.set(cap, true);

		if (enable) {
			this.context.enable(cap);
		}

		return enable;
	}

	public disable(cap: GLenum): void {
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

export default (window as any).gl as GraphicsContext;