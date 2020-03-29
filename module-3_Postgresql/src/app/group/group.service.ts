import { Transaction } from 'sequelize';
import { Sequelize, Repository } from 'sequelize-typescript';
import Group from '../../db/models/group.model';
import { GroupEntity } from '../../entities/group.entity';
import { UserGroupEntity } from '../../entities/user-group.enitity';
import { HttpRequestError } from '../../errors';
import log from '../../logger';

export class GroupService {
    constructor(
        private readonly db: Sequelize,
        private readonly model: Repository<Group> = db.getRepository(Group)
    ) {}

    upsertGroup = async (group: GroupEntity) => this.model.upsert(group, { returning: true });

    addUsersToGroup = async (group: GroupEntity, usersIds: string[]) => {
        let transaction: Transaction;

        try {
            transaction = await this.db.transaction();
            const upsertedGroup = await this.model.upsert(group, { returning: true, transaction });

            for (const userId of usersIds) {
                const userRecord =  await this.db.models.User.findByPk(userId, { transaction });
                if (!userRecord) {
                    log.warn(new HttpRequestError(404, `Unable to find record with id = ${userId}`));
                    break;
                }

                const userGroup: UserGroupEntity = {
                    userId: userId,
                    groupId: group.id
                };
                await this.db.models.UserGroup.upsert(userGroup, { transaction });
            }
            await transaction.commit();
            return upsertedGroup;

        } catch (err) {
            log.error(err);
            if (transaction) await transaction.rollback();
            throw new HttpRequestError(422, `Unable to save record = ${JSON.stringify(group)}`);
        }
    };

    getGroups = async () => this.model.findAll({ include: [{
            model: this.db.models.User,
            through: { attributes: [] }
        }]
    });

    getGroupByPk = async (id: string) => {
        const record = await this.model.findByPk(id);

        if (!record) {
            throw new HttpRequestError(404, `Unable to find record with id = ${id}`);
        }
        return record;
    };

    deleteGroup = async (id: string) => {
        await this.getGroupByPk(id);
        return this.model.destroy({ where: { id }});
    };
}
