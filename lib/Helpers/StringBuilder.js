class StringBuilder {
    constructor(string) {
        this.chunks = [];
        this.append(string);
    }
    append(string) {
        if (string !== undefined) {
            this.chunks.push(string);
        }
        return this;
    }
    appendLine(string) {
        return this.append('\n').append(string);
    }
    clear() {
        while (this.chunks.length !== 0) {
            this.chunks.shift();
        }
        return this;
    }
    toString() {
        return this.chunks.join('');
    }
}
export default StringBuilder;
