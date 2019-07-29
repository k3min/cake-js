declare enum EntryType {
    Debug = "debug",
    Error = "error",
    Warn = "warn",
    Info = "info"
}
interface Entry {
    type: EntryType;
    message: string;
    timestamp: number;
}
declare class Log {
    handle?: (entry: Entry) => void;
    add(message: string, type: EntryType): void;
    debug(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    info(message: string): void;
}
declare const log: Log;
export default log;
