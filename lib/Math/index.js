const clamp = (x, lower = 0, upper = 1) => {
    return Math.max(lower, Math.min(upper, x));
};
const lerp = (a, b, t) => {
    return a + t * (b - a);
};
export default {
    ...Math,
    clamp,
    lerp,
};
