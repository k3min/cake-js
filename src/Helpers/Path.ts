const DIRECTORY_SEPARATOR = '/';

const substr = (path: string, char: string): string => {
	let index: number = path.lastIndexOf(char);

	if (index !== -1) {
		return path.substr(index + 1, path.length - index);
	}

	return '';
};

const getFileName = (path: string, extension: boolean = false): string => {
	path = substr(path, DIRECTORY_SEPARATOR) || path;

	if (extension) {
		let index: number = path.lastIndexOf('.');

		if (index !== -1) {
			path = path.substr(0, index);
		}
	}

	return path;
};

const getExtension = (path: string): string => {
	return substr(path, '.');
};

const getDirectoryName = (path: string): string => {
	let index: number = path.lastIndexOf(DIRECTORY_SEPARATOR);

	if (index !== -1) {
		return path.substr(0, index);
	}

	return path;
};

const combine = (...paths: string[]) => paths.join(DIRECTORY_SEPARATOR)
                                             .split(DIRECTORY_SEPARATOR)
                                             .filter((part: string): boolean => !!part)
                                             .join(DIRECTORY_SEPARATOR);

export default {
	getFileName,
	getExtension,
	getDirectoryName,
	combine,
};