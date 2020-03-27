import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';
import { UserEntity as User } from '../../entities/user.entity';

export class UserController {
    private readonly SUCCESS = 201;
    constructor(
        public readonly service: UserService
    ) {}

    saveUser = async (req: Request, res: Response, next: NextFunction) => {
        const user: User = req.body;
        try {
            const [newUser] = await this.service.upsertUser(user);
            res.status(this.SUCCESS).json(newUser);
        } catch (err) {
            return next(err);
        }
    };

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            await this.service.getUserByPk(id);
            this.saveUser(req, res, next);
        } catch (err) {
            return next(err);
        }
    };

    getUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const searchedUser = await this.service.getUserByPk(id);
            res.status(this.SUCCESS).json(searchedUser);
        } catch (err) {
            return next(err);
        }
    };

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        const { limit, loginSubstring } = req.query;
        try {
            const sortedUsers = await this.service.getAutoSuggestUsers(limit, loginSubstring);
            res.status(this.SUCCESS).json(sortedUsers);
        } catch (err) {
            return next(err);
        }
    };

    removeUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const [deletedUser] = await this.service.deleteUser(id);
            res.status(this.SUCCESS).json(deletedUser);
        } catch (err) {
            return next(err);
        }
    };
}
