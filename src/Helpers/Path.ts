class Path {
	public static getExtension(path: string): string {
		const split = path.split('.');

		return ((split.length > 1) && split.pop()) || '';
	}

	public static getFileName(path: string, extension: boolean = false): string {
		const split = (path.split('/').pop() || '').split('.');

		if (!extension && split.length > 1) {
			split.pop();
		}

		return split.join('.');
	}
}

export default Path;