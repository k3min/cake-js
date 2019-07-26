enum BlendFunction {
	Zero = 0x0000, // GL_ZERO
	One = 0x0001, // GL_ONE
	SrcColor = 0x0300, // GL_SRC_COLOR
	OneMinusSrcColor = 0x0301, // GL_ONE_MINUS_SRC_COLOR
	SrcAlpha = 0x0302, // GL_SRC_ALPHA
	OneMinusSrcAlpha = 0x0303, // GL_ONE_MINUS_SRC_ALPHA
	DstAlpha = 0x0304, // GL_DST_ALPHA
	OneMinusDstAlpha = 0x0305, // GL_ONE_MINUS_DST_ALPHA
	DstColor = 0x0306, // GL_DST_COLOR
	OneMinusDstColor = 0x0307, // GL_ONE_MINUS_DST_COLOR
	SrcAlphaSaturate = 0x0308, // GL_SRC_ALPHA_SATURATE
}

export default BlendFunction;