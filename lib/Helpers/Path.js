class Path {
    static getExtension(path) {
        const split = path.split('.');
        return ((split.length > 1) && split.pop()) || '';
    }
    static getFileName(path, extension = false) {
        const split = (path.split('/').pop() || '').split('.');
        if (!extension && split.length > 1) {
            split.pop();
        }
        return split.join('.');
    }
}
export default Path;
