import { Null, Toggle } from '../Helpers';

interface GraphicsContext extends WebGLRenderingContext {
	_enabled: Toggle<GLenum>,

	ext: WEBGL_draw_buffers,
	depth: WEBGL_depth_texture,

	enableRaw(cap: GLenum): void,

	disableRaw(cap: GLenum): void,

	getExtensionRaw<T = any>(name: string): Null<T>,

	getExtension<T = any>(name: string): T,

	getExtensions(...name: string[]): void,

	enable(cap: GLenum): boolean,

	disable(cap: GLenum): void,
}

if (!('gl' in window)) {
	Object.defineProperty(window, 'gl', {
		value: document.createElement('canvas').getContext('webgl'),
	});

	Object.defineProperties((window as any).gl, {
		_enabled: { value: new Toggle<GLenum>() },

		getExtensionRaw: { value: ((window as any).gl as WebGLRenderingContext).getExtension },
		enableRaw: { value: ((window as any).gl as WebGLRenderingContext).enable },
		disableRaw: { value: ((window as any).gl as WebGLRenderingContext).disable },

		getExtension: {
			value: function <T>(name: string): T {
				const _this = this as GraphicsContext;
				const _result = _this.getExtensionRaw<T>(name);

				if (!_result) {
					throw new ReferenceError(`'${ name }' not supported!`);
				}

				return _result;
			},
		},

		getExtensions: {
			value: function (...name: string[]): void {
				const _this = this as GraphicsContext;

				for (let i = 0; i < name.length; i++) {
					_this.getExtension(name[i]);
				}
			},
		},

		ext: { value: ((window as any).gl as WebGLRenderingContext).getExtension('WEBGL_draw_buffers') },
		depth: { value: ((window as any).gl as WebGLRenderingContext).getExtension('WEBGL_depth_texture') },

		enable: {
			value: function (cap: GLenum): boolean {
				const _this = this as GraphicsContext;
				const _enable = _this._enabled.set(cap, true);

				if (_enable) {
					_this.enableRaw(cap);
				}

				return _enable;
			},
		},

		disable: {
			value: function (cap: GLenum): void {
				const _this = this as GraphicsContext;

				if (_this._enabled.set(cap, false)) {
					_this.disableRaw(cap);
				}
			},
		},
	});
}

export default (window as any).gl as GraphicsContext;