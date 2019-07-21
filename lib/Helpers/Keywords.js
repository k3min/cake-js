class Keywords {
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
            }
        }
        else if (index !== -1) {
            this.enabled.splice(index, 1);
        }
    }
    toArray() {
        return this.enabled;
    }
}
export default Keywords;
