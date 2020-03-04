
import { NextFunction, Response, Request } from 'express';
import { ValidationError } from '@hapi/joi';

export const errorHandlerMiddleware = (err: any | ValidationError, req: Request, res: Response, next: NextFunction) => {
    switch(err.name) {
        case 'ValidationError': {
            console.error(err);
            res.status(400).json({ Error: err.message });
        }; break;
        case 'HttpRequestError': {
            console.error(err);
            res.status(err.status).json({ Error: err.message });
        }; break;
        default: {
            const status = err.status && err.status || 500;
            console.error(err);
            res.status(status).json({ Error: err.message });
        }
    }
};