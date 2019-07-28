import { Toggle } from '../Core/Helpers';
import Storage from '../Core/Helpers/Storage';
export var ContextError;
(function (ContextError) {
    ContextError[ContextError["None"] = 0] = "None";
    ContextError[ContextError["InvalidEnum"] = 1280] = "InvalidEnum";
    ContextError[ContextError["InvalidValue"] = 1281] = "InvalidValue";
    ContextError[ContextError["InvalidOperation"] = 1282] = "InvalidOperation";
    ContextError[ContextError["OutOfMemory"] = 1285] = "OutOfMemory";
    ContextError[ContextError["InvalidFramebufferOperation"] = 1286] = "InvalidFramebufferOperation";
})(ContextError || (ContextError = {}));
if (!('gl' in window)) {
    Object.defineProperty(window, 'gl', {
        value: document.createElement('canvas').getContext('webgl', {
            antialias: false,
        }),
    });
    Object.defineProperties(window.gl, {
        _enabled: { value: new Toggle() },
        _extensions: { value: new Storage() },
        getErrorRaw: { value: window.gl.getError },
        getExtensionRaw: { value: window.gl.getExtension },
        enableRaw: { value: window.gl.enable },
        disableRaw: { value: window.gl.disable },
        clearRaw: { value: window.gl.clear },
        enumToString: {
            value: function (value) {
                const _this = this;
                const _result = [];
                for (let key in _this) {
                    if (typeof _this[key] === 'number' && _this[key] === value) {
                        _result.push(`gl.${key}`);
                    }
                }
                return _result;
            },
        },
        getError: {
            value: function () {
                return this.getErrorRaw();
            },
        },
        getExtension: {
            value: function (name) {
                const _this = this;
                const _cache = _this._extensions.get(name);
                if (_cache !== undefined) {
                    return _cache;
                }
                const _ext = _this.getExtensionRaw(name);
                if (_ext === null) {
                    return null;
                }
                _this._extensions.set(name, _ext);
                return _ext;
            },
        },
        requireExtension: {
            value: function (name) {
                const _this = this;
                const _ext = _this.getExtension(name);
                if (_ext === null) {
                    throw new ReferenceError(`'${name}' not supported!`);
                }
                return _ext;
            },
        },
        getExtensions: {
            value: function (names) {
                const _this = this;
                for (let i = 0; i < names.length; i++) {
                    _this.getExtension(names[i]);
                }
            },
        },
        drawBuffers: {
            value: function (buffers) {
                this.ext.drawBuffersWEBGL(buffers);
            },
        },
        enable: {
            value: function (cap) {
                const _this = this;
                const _enable = _this._enabled.set(cap, true);
                if (_enable) {
                    _this.enableRaw(cap);
                }
                return _enable;
            },
        },
        disable: {
            value: function (cap) {
                const _this = this;
                if (_this._enabled.set(cap, false)) {
                    _this.disableRaw(cap);
                }
            },
        },
        clear: {
            value: function (color = false, depth = false, stencil = false) {
                const _this = this;
                let mask = 0;
                if (color !== false) {
                    mask |= _this.COLOR_BUFFER_BIT;
                    if (color === true) {
                        _this.clearColor(0, 0, 0, 0);
                    }
                    else {
                        const [r, g, b, a] = color;
                        _this.clearColor(r, g, b, a);
                    }
                }
                if (depth !== false) {
                    mask |= _this.DEPTH_BUFFER_BIT;
                    if (depth === true) {
                        _this.clearDepth(1);
                    }
                    else {
                        _this.clearDepth(depth);
                    }
                }
                if (stencil !== false) {
                    mask |= _this.STENCIL_BUFFER_BIT;
                    if (stencil === true) {
                        _this.clearStencil(0);
                    }
                    else {
                        _this.clearStencil(stencil);
                    }
                }
                if (mask) {
                    _this.clearRaw(mask);
                }
            },
        },
    });
    Object.defineProperties(window.gl, {
        ext: { value: window.gl.requireExtension('WEBGL_draw_buffers') },
        depth: { value: window.gl.requireExtension('WEBGL_depth_texture') },
    });
    console.debug('Context: created');
}
export default window.gl;
