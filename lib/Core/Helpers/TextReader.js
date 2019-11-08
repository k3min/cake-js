class TextReader {
    constructor(text) {
        this.buffer = [];
        this.index = 0;
        text.split('\n').forEach((line) => this.buffer.push(line));
    }
    next() {
        if (this.index >= this.buffer.length) {
            return { done: true, value: '' };
        }
        return {
            done: false,
            value: this.buffer[this.index++],
        };
    }
    [Symbol.iterator]() {
        this.index = 0;
        return this;
    }
}
export default TextReader;
