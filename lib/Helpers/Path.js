const DIRECTORY_SEPARATOR = '/';
const substr = (path, char) => {
    let index = path.lastIndexOf(char);
    if (index !== -1) {
        return path.substr(index + 1, path.length - index);
    }
    return '';
};
const getFileName = (path, extension = false) => {
    path = substr(path, DIRECTORY_SEPARATOR) || path;
    if (extension) {
        let index = path.lastIndexOf('.');
        if (index !== -1) {
            path = path.substr(0, index);
        }
    }
    return path;
};
const getExtension = (path) => {
    return substr(path, '.');
};
const getDirectoryName = (path) => {
    let index = path.lastIndexOf(DIRECTORY_SEPARATOR);
    if (index !== -1) {
        return path.substr(0, index);
    }
    return path;
};
const combine = (...paths) => paths.join(DIRECTORY_SEPARATOR)
    .split(DIRECTORY_SEPARATOR)
    .filter((part) => !!part)
    .join(DIRECTORY_SEPARATOR);
export default {
    getFileName,
    getExtension,
    getDirectoryName,
    combine,
};
