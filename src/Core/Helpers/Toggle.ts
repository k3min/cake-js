class Toggle<T = string> {
	private readonly enabled: T[] = [];

	public get(item: T): boolean {
		return this.enabled.includes(item);
	}

	public set(item: T, value: boolean): boolean {
		const index = this.enabled.indexOf(item);

		if (value) {
			if (index === -1) {
				this.enabled.push(item);
				return true;
			}
		} else if (index !== -1) {
			this.enabled.splice(index, 1);
			return true;
		}

		return false;
	}

	public toArray(): T[] {
		return this.enabled;
	}
}

export default Toggle;