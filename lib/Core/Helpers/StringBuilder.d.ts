declare class StringBuilder {
    private readonly chunks;
    constructor(string?: string);
    append(string?: string): StringBuilder;
    appendLine(string?: string): StringBuilder;
    clear(): StringBuilder;
    toString(): string;
}
export default StringBuilder;
