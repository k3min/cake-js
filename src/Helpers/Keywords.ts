class Keywords {
	private readonly enabled: string[] = [];

	public get(item: string): boolean {
		return this.enabled.includes(item);
	}

	public set(item: string, value: boolean): void {
		const index = this.enabled.indexOf(item);

		if (value) {
			if (index === -1) {
				this.enabled.push(item);
			}
		} else if (index !== -1) {
			this.enabled.splice(index, 1);
		}
	}

	public toArray(): string[] {
		return this.enabled;
	}
}

export default Keywords;