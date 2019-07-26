class Base {
    constructor() {
        this.disposed = false;
    }
    dispose() {
        if (this.disposed) {
            return false;
        }
        this.disposing();
        this.disposed = true;
        return true;
    }
}
export default Base;
