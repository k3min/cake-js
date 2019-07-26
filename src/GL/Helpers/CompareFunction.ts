enum CompareFunction {
	Never = 0x0200, // GL_NEVER
	Less = 0x0201, // GL_LESS
	Equal = 0x0202, // GL_EQUAL
	LessEqual = 0x0203, // GL_LEQUAL
	Greater = 0x0204, // GL_GREATER
	NotEqual = 0x0205, // GL_NOTEQUAL
	GreaterEqual = 0x0206, // GL_GEQUAL
	Always = 0x0207, // GL_ALWAYS
}

export default CompareFunction;