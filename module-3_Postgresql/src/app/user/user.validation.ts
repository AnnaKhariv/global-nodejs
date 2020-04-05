import Joi from '@hapi/joi';

export const userSchema: Joi.Schema = Joi.object().keys({
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

export const userLoginSchema: Joi.Schema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().alphanum().min(6).required()
});
