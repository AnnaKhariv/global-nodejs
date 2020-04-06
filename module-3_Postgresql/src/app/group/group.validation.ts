import Joi from '@hapi/joi';
import { Permission } from '../../entities/group.entity';

const permissions: Permission[] = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

export const groupSchema: Joi.Schema = Joi.object().keys({
    id: Joi.string().uuid().required(),
    name: Joi.string().required(),
    permissions: Joi.array().items(Joi.string().valid(...permissions)).required(),
    users: Joi.array().items(Joi.string().uuid())
});
