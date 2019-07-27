class Path {
	public static readonly DIRECTORY_SEPARATOR: string = '/';

	private static substr(path: string, char: string): string {
		let index: number = path.lastIndexOf(char);

		if (index !== -1) {
			return path.substr(index + 1, path.length - index);
		}

		return '';
	}

	public static getFileName(path: string, extension: boolean = false): string {
		path = Path.substr(path, Path.DIRECTORY_SEPARATOR) || path;

		if (!extension) {
			let index: number = path.lastIndexOf('.');

			if (index !== -1) {
				path = path.substr(0, index);
			}
		}

		return path;
	}

	public static getExtension(path: string): string {
		return Path.substr(path, '.');
	}

	public static getDirectoryName(path: string): string {
		let index: number = path.lastIndexOf(Path.DIRECTORY_SEPARATOR);

		if (index !== -1) {
			return path.substr(0, index);
		}

		return path;
	}

	public static combine(...paths: string[]): string {
		return paths.join(Path.DIRECTORY_SEPARATOR)
		            .split(Path.DIRECTORY_SEPARATOR)
		            .filter((part: string): boolean => !!part)
		            .join(Path.DIRECTORY_SEPARATOR);
	}
}

export default Path;