import { QueryInterface } from 'sequelize';

const groups = [
    {
        id: '766b550c-2a98-46b5-9ba5-abffc4b38ef2',
        name: 'admin',
        permissions: ['READ', 'WRITE', 'DELETE', 'SHARE','UPLOAD_FILES']
    }, {
        id: '4944fbd0-0869-4d94-84a1-171afc1e103d',
        name: 'guest',
        permissions: ['READ']
    }, {
        id: '121e2a95-eca6-4799-9df5-28403339b730',
        name: 'authenticated',
        permissions: ['READ', 'WRITE']
    }
];

export = {
    up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('Group', groups, {}),
    down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('Group', null, {})
};
