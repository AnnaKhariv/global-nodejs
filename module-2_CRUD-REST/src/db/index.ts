import { config } from '../config';
import { User } from '../entity/user.entity';
import { HttpRequestError } from '../errors';
import { findIndex } from '../helpers';

const users: User[] = [];

const getAutoSuggestUsers = (limit: number =  config.limit, loginSubstring: string = ''): User[] => users
    .filter(user => user.login.startsWith(loginSubstring))
    .sort((userA: User, userB: User): number => {
        if (userA.login < userB.login) {
            return -1;
        }
        if (userA.login > userB.login) {
            return 1;
        }
        return 0;
    })
    .slice(0, limit);

const isUserExist = (id: string): number => {
    const index = findIndex(users, id);
    if (index === -1) {
        throw new HttpRequestError(404, `Unable to find record with id = ${id}`);
    }
    return index;
};

const uploadUser = (user: User, index?: number) => {
    if (index !== undefined) {
        users[index] = user;
        return;
    }


    isUserUnique(user.id);
    users.push(user);
};

const downloadUser = (index: number): User => users[index];

const deleteUser = (index: number): User => {
    users[index].isDeleted = true;
    return users[index];
};

const isUserUnique = (id: string) => {
    if (findIndex(users, id) !== -1) {
        throw new HttpRequestError(409, `User with id = ${id} already exist`);
    }
};

export {
    getAutoSuggestUsers,
    isUserExist,
    uploadUser,
    downloadUser,
    deleteUser
};
