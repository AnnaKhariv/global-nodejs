import { Sequelize, ModelCtor, Model, Op } from 'sequelize';
import { User } from '../../entities/user.entity';
import { HttpRequestError } from '../../errors';
import { config } from '../../config';

export class UserService {
    constructor(
        private readonly db: Sequelize,
        private readonly model: ModelCtor<Model<User>> = db.models.Users
    ) {}

    upsertUser = async (user: User) => this.model.upsert(user, { returning: true });

    getUserByPk = async (id: string) => {
        const record = await this.model.findByPk(id);
        if (!record) {
            throw new HttpRequestError(404, `Unable to find record with id = ${id}`);
        }
        return record;
    };

    deleteUser = async (id: string) => {
        const searchedUser = await this.getUserByPk(id);
        const rawUser: User = Object.create(searchedUser.toJSON());
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
