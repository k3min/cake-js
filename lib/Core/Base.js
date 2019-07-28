class Base {
    constructor() {
        this._disposed = false;
    }
    get disposed() {
        return this._disposed;
    }
    dispose() {
        if (this._disposed) {
            throw new ReferenceError(`Base ${this.name}: already disposed`);
        }
        this.disposing();
        this._disposed = true;
    }
}
export default Base;
