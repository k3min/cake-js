class Exception extends Error {
    constructor(message, previous) {
        super(message);
        console.error(message, previous);
    }
}
export default Exception;
