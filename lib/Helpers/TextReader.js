class TextReader {
    constructor(text) {
        this.buffer = [];
        this.index = 0;
        this.buffer.push(...text.split('\n'));
    }
    next() {
        if (this.index < this.buffer.length) {
            return {
                value: this.buffer[this.index++],
                done: false,
            };
        }
        return {
            value: '',
            done: true,
        };
    }
    [Symbol.iterator]() {
        return this;
    }
}
export default TextReader;
