class Toggle {
    constructor() {
        this.enabled = [];
    }
    get(item) {
        return this.enabled.includes(item);
    }
    set(item, value) {
        const index = this.enabled.indexOf(item);
        if (value) {
            if (index === -1) {
                this.enabled.push(item);
                return true;
            }
        }
        else if (index !== -1) {
            this.enabled.splice(index, 1);
            return true;
        }
        return false;
    }
    toArray() {
        return [...this.enabled];
    }
}
export default Toggle;
