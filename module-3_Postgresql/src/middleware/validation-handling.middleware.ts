import Joi from '@hapi/joi';
import { NextFunction, Response, Request } from 'express';

export const validationHandlerMiddleware = (schema: Joi.Schema, params: string) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[params], { abortEarly: false });
        return error ? next(error) : next();
    };
