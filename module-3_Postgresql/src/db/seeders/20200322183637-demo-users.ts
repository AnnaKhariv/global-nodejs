import { QueryInterface } from 'sequelize';

const users = [
    {
        id: '766b550c-2a98-46b5-9ba5-abffc4b38ef1',
        name: 'Nestor',
        login: 'Leader Ibuprofen',
        isDeleted: false,
        password: 'EbWWqmKlCTKm',
        age: 1
    }, {
        id: '4944fbd0-0869-4d94-84a1-171afc1e102d',
        name: 'Sheba',
        login: 'Penicillin V Potassium',
        isDeleted: false,
        password: 'CXfMjOqih',
        age: 2
    }, {
        id: '121e2a95-eca6-4799-9df5-28403339b739',
        name: 'Alphonso',
        login: 'Cubicin',
        isDeleted: false,
        password: 'g5QcqzG8k0N',
        age: 3
    }, {
        id: '7a3ab913-0b79-4711-9ad6-ae53296790cc',
        name: 'Dotti',
        login: 'BareMinerals Medium Beige matte',
        isDeleted: false,
        password: 'u8iYOC7Goh',
        age: 4
    }, {
        id: '1c6624cd-536c-4bab-beb4-3551588218d0',
        name: 'Carolan',
        login: 'Pravastatin Sodium',
        isDeleted: false,
        password: 'NjFBeoXtP',
        age: 5
    }, {
        id: '99674193-16dc-4b32-bfac-a7d38f8d3d7c',
        name: 'Maribelle',
        login: 'Ibuprofen',
        isDeleted: false,
        password: 'eJSxteYcB',
        age: 6
    }, {
        id: '578ac2d7-69a9-4d39-bcb2-6a120b33c413',
        name: 'Sayre',
        login: 'Buspirone Hydrochloride',
        isDeleted: false,
        password: 'gr0X4rYEDz',
        age: 7
    }, {
        id: 'b2623691-e4ec-4924-b45e-9880a55a97e1',
        name: 'Tonya',
        login: 'Fusarium oxysporum',
        isDeleted: false,
        password: 'HxWGGO',
        age: 8
    }, {
        id: 'cbaa0b91-effe-4f97-932c-0c7bef3888de',
        name: 'Valma',
        login: 'Instant Hand Sanitizer',
        isDeleted: false,
        password: 'JvrU9Z',
        age: 9
    }, {
        id: 'c52b932b-2e71-45ec-b55b-18a2a427565b',
        name: 'Laura',
        login: 'Haloperidol',
        isDeleted: false,
        password: 'n0WThRl',
        age: 10
    }
];

export = {
    up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('Users', users, {}),
    down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('Users', null, {})
};
