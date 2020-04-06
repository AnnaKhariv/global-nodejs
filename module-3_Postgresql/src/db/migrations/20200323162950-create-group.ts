import { QueryInterface, DataTypes } from 'sequelize';

export = {
    up: (queryInterface: QueryInterface) => queryInterface.createTable('Group', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    }),
    down: (queryInterface: QueryInterface) =>  queryInterface.dropTable('Group')
}
