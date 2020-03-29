import { NextFunction, Response, Request } from 'express';
import { ValidationError } from '@hapi/joi';
import log from '../logger';

export const errorHandlerMiddleware = (err: any | ValidationError, req: Request, res: Response, next: NextFunction) => {
    switch (err.name) {
        case 'ValidationError':
            log.error(err, err.message);
            res.status(400).json({ Error: err.message });
            break;
        case 'HttpRequestError':
            log.error(err, err.message);
            res.status(err.status).json({ Error: err.message });
            break;
        default: {
            const status = err.status && err.status || 500;
            log.error(err, err.message);
            res.status(status).json({ Error: err.message });
        }
    }
    next();
};
