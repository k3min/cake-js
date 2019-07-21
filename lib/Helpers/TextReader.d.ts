declare class TextReader implements IterableIterator<string> {
    private readonly buffer;
    private index;
    constructor(text: string);
    next(): IteratorResult<string>;
    [Symbol.iterator](): IterableIterator<string>;
}
export default TextReader;
