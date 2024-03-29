class BinaryReader {
    constructor(buffer) {
        this.index = 0;
        this.view = new DataView(buffer);
        this.buffer = buffer;
    }
    seek(offset) {
        if (offset < 0) {
            this.index = 0;
        }
        else if (offset > this.view.byteLength) {
            throw new RangeError();
        }
        else {
            this.index = offset;
        }
        return this;
    }
    readUint8() {
        const offset = this.index;
        this.seek(offset + Uint8Array.BYTES_PER_ELEMENT);
        return this.view.getUint8(offset);
    }
    readInt8() {
        const offset = this.index;
        this.seek(offset + Int8Array.BYTES_PER_ELEMENT);
        return this.view.getInt8(offset);
    }
    readUint16(littleEndian = true) {
        const offset = this.index;
        this.seek(offset + Uint16Array.BYTES_PER_ELEMENT);
        return this.view.getUint16(offset, littleEndian);
    }
    readInt16(littleEndian = true) {
        const offset = this.index;
        this.seek(offset + Int16Array.BYTES_PER_ELEMENT);
        return this.view.getInt16(offset, littleEndian);
    }
    readUint32(littleEndian = true) {
        const offset = this.index;
        this.seek(offset + Uint32Array.BYTES_PER_ELEMENT);
        return this.view.getUint32(offset, littleEndian);
    }
    readInt32(littleEndian = true) {
        const offset = this.index;
        this.seek(offset + Int32Array.BYTES_PER_ELEMENT);
        return this.view.getInt32(offset, littleEndian);
    }
    readFloat32(littleEndian = true) {
        const offset = this.index;
        this.seek(offset + Float32Array.BYTES_PER_ELEMENT);
        return this.view.getFloat32(offset, littleEndian);
    }
    readFloat64(littleEndian = true) {
        const offset = this.index;
        this.seek(offset + Float64Array.BYTES_PER_ELEMENT);
        return this.view.getFloat64(offset, littleEndian);
    }
}
export default BinaryReader;
