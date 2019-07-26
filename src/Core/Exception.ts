class Exception extends Error {
	public constructor(message: string, previous?: Error) {
		super(message);

		console.error(message, previous);
	}
}

export default Exception;