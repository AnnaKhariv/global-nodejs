import { Op, WhereOptions } from 'sequelize';
import { Sequelize, Repository } from 'sequelize-typescript';
import jwt from 'jsonwebtoken';
import User from '../../db/models/user.model';
import { UserEntity, UserLoginEntity } from '../../entities/user.entity';
import { HttpRequestError } from '../../errors';
import { config } from '../../config';
import { authConfig } from '../../config/auth.config';

export class UserService {
    constructor(
        private readonly db: Sequelize,
        private readonly model: Repository<User> = db.getRepository(User)
    ) {}

    getToken = (user: User, userCredentials: UserLoginEntity): string => {
        if(user.password !== userCredentials.password) {
            throw new HttpRequestError(403, `Password don't match for ${userCredentials.login}`);
        }

        const metadata = {
            exp: Math.floor(Date.now() / 1000) + authConfig.exp_in,
            data: { id: user.id }
        };

        return jwt.sign(metadata, authConfig.secret, { algorithm: 'HS256' });
    };

    findOneByField = async (field: WhereOptions) => {
        const record = await this.model.findOne({ where: field });
        if (!record) {
            throw new HttpRequestError(404, `Unable to find record where ${JSON.stringify(field)}`);
        }
        return record;
    };

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
