declare enum DataType {
    Int8 = 5120,
    Uint8 = 5121,
    Int16 = 5122,
    Uint16 = 5123,
    Int32 = 5124,
    Uint32 = 5125,
    Float32 = 5126
}
export declare const bytesPerElement: (type: DataType) => number;
export default DataType;
