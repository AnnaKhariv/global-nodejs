import { QueryInterface } from 'sequelize';
import { uuid } from 'uuidv4';

const userGroups = [
    {
        id: uuid(),
        userId: '766b550c-2a98-46b5-9ba5-abffc4b38ef1',
        groupId: '121e2a95-eca6-4799-9df5-28403339b730'

    }, {
        id: uuid(),
        userId: '766b550c-2a98-46b5-9ba5-abffc4b38ef1',
        groupId: '766b550c-2a98-46b5-9ba5-abffc4b38ef2'
    }, {
        id: uuid(),
        userId: '4944fbd0-0869-4d94-84a1-171afc1e102d',
        groupId: '766b550c-2a98-46b5-9ba5-abffc4b38ef2'
    }
];

export = {
    up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('UserGroup', userGroups, {}),
    down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('UserGroup', null, {})
};
