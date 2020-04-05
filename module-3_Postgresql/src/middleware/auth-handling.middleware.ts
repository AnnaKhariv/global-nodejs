import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../errors';
import { authConfig } from '../config/auth.config';

export const authHandlerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/api/user/login') {
        return next();
    }

    const headers = req.headers;
    if (!headers || Object.keys(req.headers).indexOf(authConfig.header) === -1) {
        throw new CustomError(401, 'Unauthorized Error', 'Missing Authorization Header');
    }

    const token = req.headers[authConfig.header] as string;
    if(token) {
        try {
            jwt.verify(token, authConfig.secret, { algorithms: ['HS256'] });
            return next();
        } catch(err) {
            throw new CustomError(403, 'Forbidden Error', 'HTTPAuthorization header has invalid JWTtoken');
        }
    }
};
