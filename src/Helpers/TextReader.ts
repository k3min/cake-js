class TextReader implements IterableIterator<string> {
	private readonly buffer: string[] = [];
	private index: number = 0;

	public constructor(text: string) {
		this.buffer.push(...text.split('\n'));
	}

	public next(): IteratorResult<string> {
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

	[Symbol.iterator](): IterableIterator<string> {
		return this;
	}
}

export default TextReader;