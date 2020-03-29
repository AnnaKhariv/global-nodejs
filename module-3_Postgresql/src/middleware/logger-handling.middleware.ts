import { NextFunction, Response, Request } from 'express';
import log from '../logger';

export const loggerHandlerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { path, method, params, query, body } = req;
    const metadata = {
        method,
        path,
        args: params || query || {},
        body
    };
    log.info(metadata, 'Request: ');
    return next();
};
