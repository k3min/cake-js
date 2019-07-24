var DataType;
(function (DataType) {
    DataType[DataType["Int8"] = 5120] = "Int8";
    DataType[DataType["Uint8"] = 5121] = "Uint8";
    DataType[DataType["Int16"] = 5122] = "Int16";
    DataType[DataType["Uint16"] = 5123] = "Uint16";
    DataType[DataType["Int32"] = 5124] = "Int32";
    DataType[DataType["Uint32"] = 5125] = "Uint32";
    DataType[DataType["Float32"] = 5126] = "Float32";
})(DataType || (DataType = {}));
export const bytesPerElement = (type) => {
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
