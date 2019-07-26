class StringBuilder {
	private readonly chunks: string[] = [];

	public constructor(string?: string) {
		this.append(string);
	}

	public append(string?: string): StringBuilder {
		if (string !== undefined) {
			this.chunks.push(string);
		}

		return this;
	}

	public appendLine(string?: string): StringBuilder {
		return this.append('\n').append(string);
	}

	public clear(): StringBuilder {
		while (this.chunks.length !== 0) {
			this.chunks.shift();
		}

		return this;
	}

	public toString(): string {
		return this.chunks.join('');
	}
}

export default StringBuilder;