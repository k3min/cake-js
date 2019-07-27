enum StencilFunction {
	Keep = 0x1E00, // GL_KEEP
	Zero = 0x0000, // GL_ZERO
	Replace = 0x1E01, // GL_REPLACE
	Increment = 0x1E02, // GL_INCR
	IncrementWrap = 0x8507, // GL_INCR_WRAP
	Decrement = 0x1E03, // GL_DECR
	DecrementWrap = 0x8508, // GL_DECR_WRAP,
	Invert = 0x150A // GL_INVERT
}

export default StencilFunction;