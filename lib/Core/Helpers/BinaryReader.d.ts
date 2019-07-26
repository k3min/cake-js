declare class BinaryReader {
    private index;
    private view;
    readonly buffer: ArrayBuffer;
    constructor(buffer: ArrayBuffer);
    seek(offset: number): BinaryReader;
    readUint8(): number;
    readInt8(): number;
    readUint16(littleEndian?: boolean): number;
    readInt16(littleEndian?: boolean): number;
    readUint32(littleEndian?: boolean): number;
    readInt32(littleEndian?: boolean): number;
    readFloat32(littleEndian?: boolean): number;
    readFloat64(littleEndian?: boolean): number;
}
export default BinaryReader;
