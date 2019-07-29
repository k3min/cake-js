import { Log } from './index';
class Exception extends Error {
    constructor(message, previous) {
        super(message);
        console.error(message, previous);
        Log.error(message);
    }
}
export default Exception;
