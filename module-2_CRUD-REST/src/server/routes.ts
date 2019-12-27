import express from 'express';
import { saveUser, updateUser, getUser, getAutoSuggestUsers, removeUser } from './services';
import { userSchema, validationHandlerMiddleware} from './validation';

const router = express.Router();

router.post('/user', validationHandlerMiddleware(userSchema, 'body'), saveUser);

router.post('/user/:id', updateUser);

router.get('/user/:id', getUser);

router.get('/users/:limit', getAutoSuggestUsers);

router.delete('/user/:id', removeUser);

export {
    router
};