import { QueryInterface, DataTypes } from 'sequelize';

export = {
    up: (queryInterface: QueryInterface) => queryInterface.createTable('UserGroup', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'id'
            },
            allowNull: false
        },
        groupId: {
            type: DataTypes.UUID,
            references: {
                model: 'Group',
                key: 'id'
            },
            allowNull: false
        }
    }),
    down: (queryInterface: QueryInterface) =>  queryInterface.dropTable('UserGroup')
}
