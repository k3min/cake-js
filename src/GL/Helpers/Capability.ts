enum Capability {
	CullFace = 0x0B44, // GL_CULL_FACE
	Blend = 0x0BE2, // GL_BLEND
	Dither = 0x0BD0, // GL_DITHER
	StencilTest = 0x0B90, // GL_STENCIL_TEST
	DepthTest = 0x0B71, // GL_DEPTH_TEST
	ScissorTest = 0x0C11, // GL_SCISSOR_TEST
	PolygonOffsetFill = 0x8037, // GL_POLYGON_OFFSET_FILL
	SampleAlphaToCoverage = 0x809E, // GL_SAMPLE_ALPHA_TO_COVERAGE
	SampleCoverage = 0x80A0, // GL_SAMPLE_COVERAGE
}

export default Capability;