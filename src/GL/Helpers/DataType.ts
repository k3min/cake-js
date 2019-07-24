enum DataType {
	Int8 = 5120, // GL_BYTE
	Uint8,
	Int16,
	Uint16,
	Int32,
	Uint32,
	Float32
}

export const bytesPerElement = (type: DataType): number => {
	switch (type) {
		case DataType.Int8:
		case DataType.Uint8:
			return 1;

		case DataType.Int16:
		case DataType.Uint16:
			return 2;

		case DataType.Int32:
		case DataType.Uint32:
		case DataType.Float32:
			return 4;

		default:
			throw new RangeError();
	}
};

export default DataType;