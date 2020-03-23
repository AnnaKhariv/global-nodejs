export class HttpRequestError extends Error {
    constructor(public status: number, ...args) {
        super(...args);

        this.name = 'HttpRequestError';
        Object.setPrototypeOf(this, HttpRequestError.prototype);
    }
}
