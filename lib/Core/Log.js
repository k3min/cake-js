var EntryType;
(function (EntryType) {
    EntryType["Debug"] = "debug";
    EntryType["Error"] = "error";
    EntryType["Warn"] = "warn";
    EntryType["Info"] = "info";
})(EntryType || (EntryType = {}));
class Log {
    add(message, type) {
        const entry = {
            message,
            type,
            timestamp: Date.now(),
        };
        if (this.handle) {
            this.handle(entry);
            return;
        }
        const log = `[${(new Date(entry.timestamp)).toLocaleTimeString()}] ${message}`;
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
    debug(message) {
        this.add(message, EntryType.Debug);
    }
    warn(message) {
        this.add(message, EntryType.Warn);
    }
    error(message) {
        this.add(message, EntryType.Error);
    }
    info(message) {
        this.add(message, EntryType.Info);
    }
}
const log = new Log();
export default log;
