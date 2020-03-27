import {
    Table, Column, Model,
    DataType, AllowNull, PrimaryKey,
    Default, BelongsToMany
} from 'sequelize-typescript';
import { UserEntity } from '../../entities/user.entity';
import Group from './group.model';
import UserGroup from './user-group.model';

@Table({
    timestamps: false,
    freezeTableName: true
})
export default class User extends Model<UserEntity> {
    @PrimaryKey
    @Column(DataType.UUID)
    id: string;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    login: string;

    @AllowNull(false)
    @Column
    password: string;

    @Column(DataType.INTEGER)
    age: number;

    @AllowNull(false)
    @Default(false)
    @Column
    isDeleted: boolean;

    @BelongsToMany(() => Group, {
        through: () => UserGroup,
        foreignKey: 'userId',
        otherKey: 'groupId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    groups: Array<Group & { UserGroup: UserGroup }>;
}