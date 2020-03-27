import { Request, Response, NextFunction } from 'express';
import { GroupService } from './group.service';
import { GroupEntity as Group } from '../../entities/group.entity';

export class GroupController {
    private readonly SUCCESS = 201;
    private readonly NO_CONTENT = 204;
    constructor(
        public readonly service: GroupService
    ) {}

    saveGroup = async (req: Request, res: Response, next: NextFunction) => {
        const group: Group = req.body;
        try {
            const [newGroup] = group.users && group.users.length
                ? await this.service.addUsersToGroup(group, group.users)
                : await this.service.upsertGroup(group);
            res.status(this.SUCCESS).json(newGroup);
        } catch (err) {
            return next(err);
        }
    };

    updateGroup = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            await this.service.getGroupByPk(id);
            this.saveGroup(req, res, next);
        } catch (err) {
            return next(err);
        }
    };

    getGroup = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const searchedGroup = await this.service.getGroupByPk(id);
            res.status(this.SUCCESS).json(searchedGroup);
        } catch (err) {
            return next(err);
        }
    };

    getGroups = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const groups = await this.service.getGroups();
            res.status(this.SUCCESS).json(groups);
        } catch (err) {
            return next(err);
        }
    };

    removeGroup = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            await this.service.deleteGroup(id);
            res.status(this.NO_CONTENT).send();
        } catch (err) {
            return next(err);
        }
    };
}
