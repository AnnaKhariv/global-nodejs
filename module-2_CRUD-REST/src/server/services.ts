import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/user.entity';
import { getAutoSuggestUsers, isUserExist, uploadUser, downloadUser, deleteUser } from '../db';

const SUCCESS = 201;

const saveUser = (req: Request, res: Response) => {
    const user: User = req.body;
    uploadUser(user);
    res.status(SUCCESS).json(user);
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user: User = req.body;
    try {
        const index = isUserExist(id);
        uploadUser(user, index);
        res.status(SUCCESS).json(user);
    } catch (err) {
        return next(err);
    }
};

const getUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const index = isUserExist(id);
        res.status(SUCCESS).json(downloadUser(index));
    } catch (err) {
        return next(err);
    }
};

const getUsers = (req: Request, res: Response) => {
    const { limit, loginSubstring } = req.query;
    res.status(SUCCESS).json(getAutoSuggestUsers(limit, loginSubstring));
};

const removeUser = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const index = isUserExist(id);
        const deletedUser = deleteUser(index);
        res.status(SUCCESS).json(deletedUser);
    } catch (err) {
        return next(err);
    }
};

export {
    saveUser,
    updateUser,
    getUser,
    getAutoSuggestUsers,
    getUsers,
    removeUser
};
