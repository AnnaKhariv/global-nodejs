import Joi from '@hapi/joi';
import { NextFunction, Response, Request } from 'express';

const userSchema: Joi.Schema = Joi.object().keys({
    name: Joi.string().required(),
    id: Joi.string().uuid().required(),
    login: Joi.string().required(),
    password: Joi.string().alphanum().min(6).required(),
    age: Joi.number()
        .integer()
        .min(4)
        .max(130)
        .required(),
    isDeleted: Joi.boolean().required()
});

const validationHandlerMiddleware = (schema: Joi.Schema, params: string) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[params], { abortEarly: false });
        return error ? next(error) : next();
    };

export {
    userSchema,
    validationHandlerMiddleware
};