import gl from '../index';

enum FramebufferTarget {
	Texture2D = gl.TEXTURE_2D,
	Renderbuffer = gl.RENDERBUFFER,
	CubeMap = gl.TEXTURE_CUBE_MAP,
}

export default FramebufferTarget;