enum EntryType {
	Debug = 'debug',
	Error = 'error',
	Warn = 'warn',
	Info = 'info'
}

interface Entry {
	type: EntryType;
	message: string;
	timestamp: number;
}

class Log {
	public handle?: (entry: Entry) => void;

	public add(message: string, type: EntryType) {
		const entry: Entry = {
			message,
			type,
			timestamp: Date.now(),
		};

		if (this.handle) {
			this.handle(entry);
			return;
		}

		const log: string = `[${ (new Date(entry.timestamp)).toLocaleTimeString() }] ${ message }`;

		switch (type) {
			case EntryType.Debug:
				console.debug(log);
				break;

			case EntryType.Warn:
				console.warn(log);
				break;

			case EntryType.Error:
				console.error(log);
				break;

			case EntryType.Info:
				console.info(log);
				break;
		}
	}

	public debug(message: string) {
		this.add(message, EntryType.Debug);
	}

	public warn(message: string) {
		this.add(message, EntryType.Warn);
	}

	public error(message: string) {
		this.add(message, EntryType.Error);
	}

	public info(message: string) {
		this.add(message, EntryType.Info);
	}
}

const log: Log = new Log();

export default log;