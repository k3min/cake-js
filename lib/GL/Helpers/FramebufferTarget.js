import gl from '../index';
var FramebufferTarget;
(function (FramebufferTarget) {
    FramebufferTarget[FramebufferTarget["Texture2D"] = gl.TEXTURE_2D] = "Texture2D";
    FramebufferTarget[FramebufferTarget["Renderbuffer"] = gl.RENDERBUFFER] = "Renderbuffer";
    FramebufferTarget[FramebufferTarget["CubeMap"] = gl.TEXTURE_CUBE_MAP] = "CubeMap";
})(FramebufferTarget || (FramebufferTarget = {}));
export default FramebufferTarget;
