class Path {
    static substr(path, char) {
        let index = path.lastIndexOf(char);
        if (index !== -1) {
            return path.substr(index + 1, path.length - index);
        }
        return '';
    }
    static getFileName(path, extension = false) {
        path = Path.substr(path, Path.DIRECTORY_SEPARATOR) || path;
        if (!extension) {
            let index = path.lastIndexOf('.');
            if (index !== -1) {
                path = path.substr(0, index);
            }
        }
        return path;
    }
    static getExtension(path) {
        return Path.substr(path, '.');
    }
    static getDirectoryName(path) {
        let index = path.lastIndexOf(Path.DIRECTORY_SEPARATOR);
        if (index !== -1) {
            return path.substr(0, index);
        }
        return path;
    }
    static combine(...paths) {
        return paths.join(Path.DIRECTORY_SEPARATOR)
            .split(Path.DIRECTORY_SEPARATOR)
            .filter((part) => !!part)
            .join(Path.DIRECTORY_SEPARATOR);
    }
}
Path.DIRECTORY_SEPARATOR = '/';
export default Path;
