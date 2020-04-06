import { uuid } from 'uuidv4';
import {
    Table, Column,
    Model, DataType, PrimaryKey,
    ForeignKey, Default
} from 'sequelize-typescript';
import { UserGroupEntity } from '../../entities/user-group.enitity';
import User from './User.model';
import Group from './group.model';

@Table({
    timestamps: false,
    freezeTableName: true
})
export default class UserGroup extends Model<UserGroupEntity> {
    @PrimaryKey
    @Default(() => uuid())
    @Column(DataType.UUID)
    id: string;

    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId: string;

    @ForeignKey(() => Group)
    @Column(DataType.UUID)
    groupId: string;
}
