declare class BinaryReader {
    private index;
    private view;
    readonly buffer: ArrayBuffer;
    constructor(buffer: ArrayBuffer);
    seek(offset: number): BinaryReader;
    readUint8(): number;
    readInt8(): number;
    readUint16(): number;
    readInt16(): number;
    readUint32(): number;
    readInt32(): number;
    readFloat32(): number;
    readFloat64(): number;
}
export default BinaryReader;
