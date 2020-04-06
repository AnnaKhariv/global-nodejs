import { NextFunction, Response, Request } from 'express';
import log from '../logger';

export const loggerHandlerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { path, method, params, query, body } = req;
    const obscuredSensitiveInfo = body.password ? Object.assign({}, body, { password: body.password.replace(/./g, '*') }) : body;

    const metadata = {
        method,
        path,
        args: params || query || {},
        body: obscuredSensitiveInfo
    };
    log.info(metadata, 'Request: ');
    return next();
};
