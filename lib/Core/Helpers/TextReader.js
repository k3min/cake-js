class TextReader {
    constructor(text) {
        this.buffer = [];
        this.index = 0;
        text.split('\n').forEach((line) => this.buffer.push(line));
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
