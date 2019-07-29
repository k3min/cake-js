import { Log } from './index';

class Exception extends Error {
	public constructor(message: string, previous?: Error) {
		super(message);

		console.error(message, previous);

		Log.error(message);
	}
}

export default Exception;