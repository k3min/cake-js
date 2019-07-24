import { Toggle } from '../Helpers';
if (!('gl' in window)) {
    Object.defineProperty(window, 'gl', {
        value: document.createElement('canvas').getContext('webgl'),
    });
    Object.defineProperties(window.gl, {
        _enabled: { value: new Toggle() },
        getExtensionRaw: { value: window.gl.getExtension },
        enableRaw: { value: window.gl.enable },
        disableRaw: { value: window.gl.disable },
        getExtension: {
            value: function (name) {
                const _this = this;
                const _result = _this.getExtensionRaw(name);
                if (!_result) {
                    throw new ReferenceError(`'${name}' not supported!`);
                }
                return _result;
            },
        },
        getExtensions: {
            value: function (...name) {
                const _this = this;
                for (let i = 0; i < name.length; i++) {
                    _this.getExtension(name[i]);
                }
            },
        },
        ext: { value: window.gl.getExtension('WEBGL_draw_buffers') },
        depth: { value: window.gl.getExtension('WEBGL_depth_texture') },
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
    });
}
export default window.gl;
