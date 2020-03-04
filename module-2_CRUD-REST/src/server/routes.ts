import express from 'express';
import { saveUser, updateUser, getUser, removeUser, getUsers } from './services';
import { userSchema, validationHandlerMiddleware} from './validation';

export const router = express.Router();

router.post('/user', validationHandlerMiddleware(userSchema, 'body'), saveUser);

router.route('/user/:id')
    .get(getUser)
    .post(validationHandlerMiddleware(userSchema, 'body'), updateUser)
    .delete(removeUser);

router.get('/users', getUsers);