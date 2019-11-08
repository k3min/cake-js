import 'reflect-metadata';
export const range = (metadata) => {
    return Reflect.metadata(Range.SYMBOL, metadata);
};
class Range {
    constructor(min, max, step) {
        this.min = min;
        this.max = max;
        this.step = step;
    }
    static get(target, property) {
        const { min, max, step, } = Reflect.getMetadata(Range.SYMBOL, target, property);
        return new Range(min, max, step);
    }
    ;
    static all(target) {
        const result = [];
        for (let property in target) {
            if (target.hasOwnProperty(property)) {
                if (Reflect.hasMetadata(Range.SYMBOL, target, property)) {
                    result.push(Range.get(target, property));
                }
            }
        }
        return result;
    }
}
Range.SYMBOL = 'cake:range';
export default Range;
