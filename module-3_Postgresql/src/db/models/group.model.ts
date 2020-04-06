import {
    Table, Column, Model,
    DataType, AllowNull, PrimaryKey,
    BelongsToMany
} from 'sequelize-typescript';
import { GroupEntity, Permission } from '../../entities/group.entity';
import User from './user.model';
import UserGroup from './user-group.model';

@Table({
    timestamps: false,
    freezeTableName: true
})
export default class Group extends Model<GroupEntity> {
    @PrimaryKey
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column(DataType.ARRAY(DataType.STRING))
    permissions: Array<Permission>;

    @BelongsToMany(() => User, {
        through: () => UserGroup,
        foreignKey: 'groupId',
        otherKey: 'userId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    users: Array<User & { UserGroup: UserGroup }>;
}
