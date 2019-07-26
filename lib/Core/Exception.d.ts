declare class Exception extends Error {
    constructor(message: string, previous?: Error);
}
export default Exception;
