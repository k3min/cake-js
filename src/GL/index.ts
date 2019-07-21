import Null from '../Helpers/Null';
import Toggle from '../Helpers/Toggle';

type ToggleFn<T = void> = (cap: GLenum) => T;
type ExtensionFn = <T = any>(name: string) => Null<T>;
type ExtensionsFn = (...name: string[]) => void;

interface GraphicsContext extends WebGLRenderingContext {
	_enabled: Toggle<GLenum>,
	enableRaw: ToggleFn,
	disableRaw: ToggleFn,
	getExtensionRaw: ExtensionFn,
	getExtension: ExtensionFn,
	getExtensions: ExtensionsFn,
	enable: ToggleFn<boolean>,
	disable: ToggleFn,
	ext: WEBGL_draw_buffers,
	depth: WEBGL_depth_texture,
}

if (!('gl' in window)) {
	Object.defineProperty(window, 'gl', {
		value: document.createElement('canvas').getContext('webgl'),
	});

	Object.defineProperties((window as any).gl, {
		_enabled: { value: new Toggle<GLenum>() },

		getExtensionRaw: { value: ((window as any).gl as GraphicsContext).getExtension },
		enableRaw: { value: ((window as any).gl as GraphicsContext).enable },
		disableRaw: { value: ((window as any).gl as GraphicsContext).disable },

		getExtension: {
			value: function <T>(name: string): T {
				const _this = this as GraphicsContext;
				const _result = _this.getExtensionRaw<T>(name);

				if (!_result) {
					throw new Error(`'${ name }' not supported!`);
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

		ext: { value: ((window as any).gl as GraphicsContext).getExtension<WEBGL_draw_buffers>('WEBGL_draw_buffers') },
		depth: { value: ((window as any).gl as GraphicsContext).getExtension<WEBGL_depth_texture>('WEBGL_depth_texture') },

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