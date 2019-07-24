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
});
export default Math;
