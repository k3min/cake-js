import { DataType } from '../GL/Helpers';
Object.defineProperties(Math, {
    deg2Rad: { value: 0.0174532925 },
    rad2Deg: { value: 57.2957795 },
    clamp: {
        value: (x, lower = 0, upper = 1) => Math.max(lower, Math.min(upper, x)),
    },
    lerp: {
        value: (a, b, t) => a + t * (b - a),
    },
    nextPowerOfTwo: {
        value: (x) => {
            x--;
            let p = 2;
            // noinspection AssignmentResultUsedJS
            while (x >>= 1) {
                p <<= 1;
            }
            return p;
        },
    },
    bytesPerElement: {
        value: (type) => {
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
        },
    },
    nextByteBoundary: {
        value: (x, pack = 4) => {
            const offset = x % pack;
            if (offset !== 0) {
                x += pack - offset;
            }
            return x;
        },
    },
    rsqrt: {
        value: (x) => {
            return 1 / Math.sqrt(x);
        },
    },
});
export default Math;
