import { Null, Toggle, Omit } from '../Core/Helpers';
import Storage from '../Core/Helpers/Storage';
import Vector4 from '../Math/Vector4';
import { Capability } from './Helpers';

interface Context extends Omit<WebGLRenderingContext, 'clear' | 'enable' | 'disable' | 'getExtension'> {
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

	getExtensions(names: string[]): void;

	enable(cap: Capability): boolean;

	disable(cap: Capability): void;

	clear(color?: Vector4 | boolean, depth?: GLclampf | boolean, stencil?: GLint | boolean): void;

	drawBuffers(buffers: GLenum[]): void;
}

if (!('gl' in window)) {
	Object.defineProperty(window, 'gl', {
		value: document.createElement('canvas').getContext('webgl', {
			antialias: false,
		}),
	});

	Object.defineProperties((window as any).gl, {
		_enabled: { value: new Toggle<Capability>() },
		_extensions: { value: new Storage<any>() },

		getExtensionRaw: { value: ((window as any).gl as WebGLRenderingContext).getExtension },
		enableRaw: { value: ((window as any).gl as WebGLRenderingContext).enable },
		disableRaw: { value: ((window as any).gl as WebGLRenderingContext).disable },
		clearRaw: { value: ((window as any).gl as WebGLRenderingContext).clear },

		getExtension: {
			value: function <T>(name: string): Null<T> {
				const _this: Context = this as Context;
				const _cache: Null<T> = _this._extensions.get(name);

				if (_cache) {
					return _cache;
				}

				const _ext: Null<T> = _this.getExtensionRaw<T>(name);

				if (!_ext) {
					return null;
				}

				_this._extensions.set(name, _ext);

				return _ext;
			},
		},

		requireExtension: {
			value: function <T>(name: string): T {
				const _this: Context = this as Context;
				const _ext: Null<T> = _this.getExtension<T>(name);

				if (!_ext) {
					throw new ReferenceError(`'${ name }' not supported!`);
				}

				return _ext;
			},
		},

		getExtensions: {
			value: function (names: string[]): void {
				const _this: Context = this as Context;

				for (let i = 0; i < names.length; i++) {
					_this.getExtension(names[i]);
				}
			},
		},

		drawBuffers: {
			value: function (buffers: GLenum[]): void {
				(this as Context).ext.drawBuffersWEBGL(buffers);
			},
		},

		enable: {
			value: function (cap: Capability): boolean {
				const _this: Context = this as Context;
				const _enable: boolean = _this._enabled.set(cap, true);

				if (_enable) {
					_this.enableRaw(cap);
				}

				return _enable;
			},
		},

		disable: {
			value: function (cap: Capability): void {
				const _this: Context = this as Context;

				if (_this._enabled.set(cap, false)) {
					_this.disableRaw(cap);
				}
			},
		},

		clear: {
			value: function (color: Vector4 | boolean = false, depth: GLclampf | boolean = false, stencil: GLint | boolean = false): void {
				const _this: Context = this as Context;

				let mask: GLbitfield = 0;

				if (color !== false) {
					mask |= _this.COLOR_BUFFER_BIT;

					if (color === true) {
						_this.clearColor(0, 0, 0, 0);
					} else {
						const [r, g, b, a]: Vector4 = color as Vector4;
						_this.clearColor(r, g, b, a);
					}
				}

				if (depth !== false) {
					mask |= _this.DEPTH_BUFFER_BIT;

					if (depth === true) {
						_this.clearDepth(1);
					} else {
						_this.clearDepth(depth);
					}
				}

				if (stencil !== false) {
					mask |= _this.STENCIL_BUFFER_BIT;

					if (stencil === true) {
						_this.clearStencil(0);
					} else {
						_this.clearStencil(stencil);
					}
				}

				if (mask) {
					_this.clearRaw(mask);
				}
			},
		},
	});

	Object.defineProperties((window as any).gl, {
		ext: { value: ((window as any).gl as Context).requireExtension<WEBGL_draw_buffers>('WEBGL_draw_buffers') },
		depth: { value: ((window as any).gl as Context).requireExtension<WEBGL_depth_texture>('WEBGL_depth_texture') },
	});

	console.debug('Context: created');
}

export default (window as any).gl as Context;