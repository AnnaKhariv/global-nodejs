import { Op } from 'sequelize';
import { Sequelize, Repository } from 'sequelize-typescript';
import User from '../../db/models/user.model';
import { UserEntity } from '../../entities/user.entity';
import { HttpRequestError } from '../../errors';
import { config } from '../../config';

export class UserService {
    constructor(
        private readonly db: Sequelize,
        private readonly model: Repository<User> = db.getRepository(User)
    ) {}

    upsertUser = async (user: UserEntity) => this.model.upsert(user, { returning: true });

    getUserByPk = async (id: string) => {
        const record = await this.model.findByPk(id);
        if (!record) {
            throw new HttpRequestError(404, `Unable to find record with id = ${id}`);
        }
        return record;
    };

    deleteUser = async (id: string) => {
        const searchedUser = await this.getUserByPk(id);
        const rawUser: UserEntity = Object.create(searchedUser.toJSON());
        rawUser.isDeleted = true;
        return this.upsertUser(rawUser);
    };

    getAutoSuggestUsers = (limit: number =  config.limit, loginSubstring: string = '') => {
        return this.model.findAll({
            where: { login: { [Op.startsWith]: loginSubstring } },
            order: ['login'],
            limit
        });
    }
}
