import express from 'express';
import { validationHandlerMiddleware } from '../middleware/validation-handling.middleware';
import { UserController } from '../app/user/user.controller';
import { userSchema } from '../app/user/user.validation';

export class Router {
    constructor(
        private readonly controller: UserController,
        readonly router: express.Router = express.Router()
    ) {
        router.post('/user',
            validationHandlerMiddleware(userSchema, 'body'), this.controller.saveUser);

        router.route('/user/:id')
            .get(this.controller.getUser)
            .post(validationHandlerMiddleware(userSchema, 'body'), this.controller.updateUser)
            .delete(this.controller.removeUser);

        router.get('/users', this.controller.getUsers);
    }
}
