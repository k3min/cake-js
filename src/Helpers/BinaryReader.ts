class BinaryReader {
	private index: number = 0;
	private view: DataView;

	public readonly buffer: ArrayBuffer;

	public constructor(buffer: ArrayBuffer) {
		this.view = new DataView(buffer);
		this.buffer = buffer;
	}

	public seek(offset: number): BinaryReader {
		if (offset < 0) {
			this.index = 0;
		} else if (offset > this.view.byteLength) {
			throw new RangeError();
		} else {
			this.index = offset;
		}

		return this;
	}

	public readUint8(): number {
		const offset: number = this.index;
		this.seek(offset + Uint8Array.BYTES_PER_ELEMENT);
		return this.view.getUint8(offset);
	}

	public readInt8(): number {
		const offset: number = this.index;
		this.seek(offset + Int8Array.BYTES_PER_ELEMENT);
		return this.view.getInt8(offset);
	}

	public readUint16(littleEndian: boolean = true): number {
		const offset: number = this.index;
		this.seek(offset + Uint16Array.BYTES_PER_ELEMENT);
		return this.view.getUint16(offset, littleEndian);
	}

	public readInt16(littleEndian: boolean = true): number {
		const offset: number = this.index;
		this.seek(offset + Int16Array.BYTES_PER_ELEMENT);
		return this.view.getInt16(offset, littleEndian);
	}

	public readUint32(littleEndian: boolean = true): number {
		const offset: number = this.index;
		this.seek(offset + Uint32Array.BYTES_PER_ELEMENT);
		return this.view.getUint32(offset, littleEndian);
	}

	public readInt32(littleEndian: boolean = true): number {
		const offset: number = this.index;
		this.seek(offset + Int32Array.BYTES_PER_ELEMENT);
		return this.view.getInt32(offset, littleEndian);
	}

	public readFloat32(littleEndian: boolean = true): number {
		const offset: number = this.index;
		this.seek(offset + Float32Array.BYTES_PER_ELEMENT);
		return this.view.getFloat32(offset, littleEndian);
	}

	public readFloat64(littleEndian: boolean = true): number {
		const offset: number = this.index;
		this.seek(offset + Float64Array.BYTES_PER_ELEMENT);
		return this.view.getFloat64(offset, littleEndian);
	}
}

export default BinaryReader;