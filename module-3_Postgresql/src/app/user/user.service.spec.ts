import { Op } from 'sequelize';
import { Sequelize, Repository } from 'sequelize-typescript';
import { UserService } from './user.service';
import User from '../../db/models/user.model';
import { config } from '../../config';

import {
    userMock,
    deletedUserMock,
    userCredentialMock,
    userCredentialErrorMock
} from '../../mocks/user.mock';

// eslint-disable-next-line
const jwtTokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODYzNzY4NTksImRhdGEiOnsiaWQiOiIxMjFlMmE5NS1lY2E2LTQ3OTktOWRmNS0yODQwMzMzMDU3MzAifSwiaWF0IjoxNTg2MzczMjU5fQ.Mhj0WSckTX0_NAd-6sAjPtWX2BP4O7UjPnWB-u2WWd0';
const dateMock = 1586373259711;

jest.doMock('sequelize');
jest.doMock('sequelize-typescript');
jest.doMock('jsonwebtoken', () => ({
    sign: jest.fn(() => jwtTokenMock)
}));
jest.doMock('../../db/models/user.model');
jest.doMock('../../db/models/group.model');
jest.doMock('../../db/models/user-group.model');

let userService: UserService;
let mockDb;

describe('# User Service #', () => {
    beforeAll(() => {
        mockDb = {
            findOne: jest.fn(() => userMock),
            findAll: jest.fn(() => [userMock]),
            findByPk: jest.fn(() => userMock),
            upsert: jest.fn(() => deletedUserMock)
        };
        userService = new UserService({} as Sequelize, mockDb as Repository<User>);
    });

    test('#findOneByField: Should find user record by passed field in db', async () => {
        const res = await userService.findOneByField({ id: userMock.id });
        expect(mockDb.findOne).toHaveBeenCalled();
        expect(res).toEqual(userMock);
    });

    test('#getAutoSuggestUsers: Should return users limited by passed param, sorted and ordered from db', async () => {
        const res = await userService.getAutoSuggestUsers();
        expect(mockDb.findAll).toHaveBeenCalled();
        expect(mockDb.findAll).toHaveBeenCalledWith({
            limit: config.limit,
            order: ['login'],
            where: { login: { [Op.startsWith]: '' } }
        });
        expect(res).toEqual([userMock]);
    });

    test('#getToken: Should return jwt token', async () => {
        const dateTimeSpy = jest.spyOn(global.Date, 'now').mockReturnValue(dateMock);
        const res = await userService.getToken(userMock, userCredentialMock);
        expect(dateTimeSpy).toHaveBeenCalled();
        expect(res).toEqual(jwtTokenMock);
    });

    test('#deleteUser: Should delete user(change isDeleted to true) from db', async () => {
        userMock.toJSON = () => userMock;
        const res = await userService.deleteUser(userMock.id);
        expect(mockDb.findByPk).toHaveBeenCalled();
        expect(mockDb.upsert).toHaveBeenCalled();
        expect(res).toEqual(deletedUserMock);
        delete userMock.toJSON;
    });

    test('#getUserByPk: Should find user record by id in db', async () => {
        const res = await userService.getUserByPk(userMock.id);
        expect(mockDb.findByPk).toHaveBeenCalled();
        expect(res).toEqual(userMock);
    });
});

describe('# User Service - Error handling #', () => {
    beforeAll(() => {
        mockDb = {
            findOne: jest.fn(() => null),
            findByPk: jest.fn(() => null)
        };
        userService = new UserService({} as Sequelize, mockDb as Repository<User>);
    });

    test('#findOneByField: Should throw Error if user not founded by passed field in db', async () => {
        const field = { id: null };
        try {
            await userService.findOneByField(field);
        } catch (err) {
            expect(mockDb.findOne).toHaveBeenCalled();
            expect(err.name).toEqual('HttpRequestError');
            expect(err.message).toEqual(`Unable to find record where ${JSON.stringify(field)}`);
        }
    });

    test('#getToken: Should throw Error if user credentials don`t match', async () => {
        try {
            await userService.getToken(userMock, userCredentialErrorMock);
        } catch (err) {
            expect(err.name).toEqual('HttpRequestError');
            expect(err.message).toEqual(`Password don't match for ${userCredentialErrorMock.login}`);
        }
    });

    test('#getUserByPk: Should throw Error if user not founded by passed id in db', async () => {
        try {
            await userService.getUserByPk(userMock.id);
        } catch (err) {
            expect(mockDb.findByPk).toHaveBeenCalled();
            expect(err.name).toEqual('HttpRequestError');
            expect(err.message).toEqual(`Unable to find record with id = ${userMock.id}`);
        }
    });
});
