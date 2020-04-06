import { QueryInterface, DataTypes } from 'sequelize';

export = {
    up: (queryInterface: QueryInterface) => queryInterface.createTable('User', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
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
            type: DataTypes.INTEGER
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }),
    down: (queryInterface: QueryInterface) =>  queryInterface.dropTable('User')
}

