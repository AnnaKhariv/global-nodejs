import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { User } from '../../entities/user.entity';

export type Users = typeof Model & {
    new (values?: object, options?: BuildOptions): User;
}

export const defineUserModel = (sequelize: Sequelize): Users =>
    <Users>sequelize.define('Users', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    },
    {
        timestamps: false
    });
