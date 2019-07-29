import { Log } from '../Core';
import { Null, Toggle, Omit, Storage } from '../Core/Helpers';
import { Vector4 } from '../Math';
import { Capability } from './Helpers';

export enum ContextError {
	None = 0x0000, // GL_NONE
	InvalidEnum = 0x0500, // GL_Invalid_Enum
	InvalidValue = 0x0501, // GL_Invalid_value
	InvalidOperation = 0x0502, // GL_Invalid_operation
	OutOfMemory = 0x0505, // GL_Out_Of_Memory
	InvalidFramebufferOperation = 0x0506, // GL_Invalid_Framebuffer_Operation
}

type Override = 'clear' | 'enable' | 'disable' | 'getExtension' | 'getError' | 'drawBuffers';
type RenderingContext = WebGLRenderingContext & WebGL2RenderingContext;

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

if (!('gl' in window)) {
	Object.defineProperty(window, 'gl', {
		value: document.createElement('canvas').getContext('webgl', {
			antialias: false,
		}),
	});

	const gl: Context = (window as any).gl;

	Object.defineProperties(gl, {
		_enabled: { value: new Toggle<Capability>() },
		_extensions: { value: new Storage<any>() },

		drawBuffersRaw: { value: gl.drawBuffers },
		getErrorRaw: { value: gl.getError },
		getExtensionRaw: { value: gl.getExtension },
		enableRaw: { value: gl.enable },
		disableRaw: { value: gl.disable },
		clearRaw: { value: gl.clear },

		isWebGL2: {
			enumerable: true,
			value: (gl instanceof WebGL2RenderingContext),
		},

		canvas: {
			enumerable: true,
			value: gl.canvas,
		},

		enumToString: {
			value: function (value: GLenum): string[] {
				const _this: Context = this as Context;
				const _result: string[] = [];

				for (let key in _this) {
					if (typeof (_this as any)[key] === 'number' && (_this as any)[key] === value) {
						_result.push(`gl.${ key }`);
					}
				}

				return _result;
			},
		},

		getError: {
			enumerable: true,
			value: function (): ContextError {
				return (this as Context).getErrorRaw();
			},
		},

		getExtension: {
			enumerable: true,
			value: function <T>(name: string): Null<T> {
				const _this: Context = this as Context;
				const _cache: Null<T> = _this._extensions.get(name);

				if (_cache !== undefined) {
					return _cache;
				}

				const _ext: Null<T> = _this.getExtensionRaw<T>(name);

				if (_ext === null) {
					return null;
				}

				_this._extensions.set(name, _ext);

				return _ext;
			},
		},

		requireExtension: {
			enumerable: true,
			value: function <T>(name: string): T {
				const _this: Context = this as Context;
				const _ext: Null<T> = _this.getExtension<T>(name);

				if (_ext === null) {
					throw new ReferenceError(`Context: '${ name }' not supported`);
				}

				return _ext;
			},
		},

		getExtensions: {
			enumerable: true,
			value: function (names: string[]): void {
				const _this: Context = this as Context;

				for (let i = 0; i < names.length; i++) {
					_this.getExtension(names[i]);
				}
			},
		},

		drawBuffers: {
			enumerable: true,
			value: function (buffers: GLenum[]): void {
				const _this: Context = this as Context;

				if (_this.ext) {
					_this.ext.drawBuffersWEBGL(buffers);
				} else if (_this.drawBuffersRaw) {
					_this.drawBuffersRaw(buffers);
				} else {
					throw new ReferenceError(`Context: 'drawBuffers' not supported`);
				}
			},
		},

		enable: {
			enumerable: true,
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
			enumerable: true,
			value: function (cap: Capability): void {
				const _this: Context = this as Context;

				if (_this._enabled.set(cap, false)) {
					_this.disableRaw(cap);
				}
			},
		},

		clear: {
			enumerable: true,
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

	Object.defineProperties(gl, {
		ext: {
			enumerable: true,
			value: gl.getExtension<WEBGL_draw_buffers>('WEBGL_draw_buffers'),
		},
	});

	Log.debug('Context: created');
}

export default (window as any).gl as Context;