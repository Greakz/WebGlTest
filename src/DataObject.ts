export class DataObject<T> {
    protected data: T;
    constructor(data: T) {
        this.data = data;
    }
    getData(): T {
        return this.data
    }
}