class Base {
    constructor() {
        this.disposed = false;
    }
    dispose() {
        if (this.disposed) {
            throw new ReferenceError(`Base ${this.name}: already disposed`);
        }
        this.disposing();
        this.disposed = true;
    }
}
export default Base;
