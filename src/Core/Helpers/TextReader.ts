class TextReader implements IterableIterator<string> {
	private readonly buffer: string[] = [];
	private index: number = 0;

	public constructor(text: string) {
		text.split('\n').forEach((line: string): number => this.buffer.push(line));
	}

	public next(): IteratorResult<string> {
		if (this.index >= this.buffer.length) {
			return { done: true, value: '' };
		}

		return {
			done: false,
			value: this.buffer[this.index++],
		};
	}

	[Symbol.iterator](): IterableIterator<string> {
		this.index = 0;

		return this;
	}
}

export default TextReader;