import express from 'express';
import { validationHandlerMiddleware } from '../middleware/validation-handling.middleware';
import { UserController } from '../app/user/user.controller';
import { userSchema } from '../app/user/user.validation';
import { GroupController } from '../app/group/group.controller';
import { groupSchema } from '../app/group/group.validation';

export class Router {
    constructor(
        private readonly userController: UserController,
        private readonly groupController: GroupController,
        readonly router: express.Router = express.Router()
    ) {
        router.post('/user',
            validationHandlerMiddleware(userSchema, 'body'), this.userController.saveUser);

        router.route('/user/:id')
            .get(this.userController.getUser)
            .post(validationHandlerMiddleware(userSchema, 'body'), this.userController.updateUser)
            .delete(this.userController.removeUser);

        router.get('/users', this.userController.getUsers);

        router.post('/group',
            validationHandlerMiddleware(groupSchema, 'body'), this.groupController.saveGroup);

        router.get('/groups', this.groupController.getGroups);

        router.route('/group/:id')
            .get(this.groupController.getGroup)
            .post(validationHandlerMiddleware(groupSchema, 'body'), this.groupController.updateGroup)
            .delete(this.groupController.removeGroup);
    }
}
