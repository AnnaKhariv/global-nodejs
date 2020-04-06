export class HttpRequestError extends Error {
    constructor(public status: number, ...args) {
        super(...args);

        this.name = 'HttpRequestError';
        Object.setPrototypeOf(this, HttpRequestError.prototype);
    }
}

export class CustomError extends Error {
    constructor(public status: number, name, message, ...args) {
        super(...args);

        this.name = name;
        this.message = message;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
