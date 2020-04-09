import { Request, Response } from 'express';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import {
    userMock,
    deletedUserMock,
    userCredentialMock,
    userCredentialErrorMock
} from '../../mocks/user.mock';

jest.doMock('express');

let userController: UserController;
let mockService;
const requestMock: Request = {} as any;
let responseMock: Response;
let nextFunctionMock;
const SUCCESS = 201;
// eslint-disable-next-line
const jwtTokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODYzNzY4NTksImRhdGEiOnsiaWQiOiIxMjFlMmE5NS1lY2E2LTQ3OTktOWRmNS0yODQwMzMzMDU3MzAifSwiaWF0IjoxNTg2MzczMjU5fQ.Mhj0WSckTX0_NAd-6sAjPtWX2BP4O7UjPnWB-u2WWd0';

describe('# User Controller #', () => {
    beforeAll(() => {
        mockService = {
            upsertUser: jest.fn(() => [userMock]),
            findOneByField: jest.fn(() => userMock),
            getToken: jest.fn(() => jwtTokenMock),
            getUserByPk: jest.fn(() => userMock),
            getAutoSuggestUsers: jest.fn(() => [userMock]),
            deleteUser: jest.fn(() => [deletedUserMock])
        };
        responseMock = {
            status: jest.fn(() => responseMock),
            json: jest.fn(() => responseMock)
        } as any;
        userController = new UserController(mockService as UserService);
        nextFunctionMock = jest.fn();
    });

    test('#login: Should return appropriate response if user login succesfully', async () => {
        requestMock.body = userCredentialMock;
        await userController.login(requestMock, responseMock, nextFunctionMock);
        expect(mockService.findOneByField).toHaveBeenCalled();
        expect(mockService.getToken).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith({
            status: 'Authorized',
            token: jwtTokenMock
        });
    });

    test('#saveUser: Should return appropriate response if user saved succesfully', async () => {
        requestMock.body = userMock;
        await userController.saveUser(requestMock, responseMock, nextFunctionMock);
        expect(mockService.upsertUser).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith(userMock);
    });

    test('#updateUser: Should return appropriate response if user updated succesfully', async () => {
        requestMock.params = {
            id: userMock.id
        };
        requestMock.body = userMock;
        await userController.updateUser(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getUserByPk).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith(userMock);
    });

    test('#getUser: Should return appropriate response if user finded by id succesfully', async () => {
        requestMock.params = {
            id: userMock.id
        };
        await userController.getUser(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getUserByPk).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith(userMock);
    });

    test('#getUsers: Should return appropriate response if users fetched succesfully', async () => {
        requestMock.query = {
            loginSubstring: 'log'
        };
        await userController.getUsers(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getAutoSuggestUsers).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith([userMock]);
    });

    test('#removeUser: Should return appropriate response if user removed succesfully', async () => {
        requestMock.params = {
            id: userMock.id
        };
        await userController.removeUser(requestMock, responseMock, nextFunctionMock);
        expect(mockService.deleteUser).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith(deletedUserMock);
    });
});

describe('# User Controller - Error handling #', () => {
    const error = new Error('Error');

    beforeAll(() => {
        mockService = {
            findOneByField: jest.fn(() => {
                throw error;
            }),
            upsertUser: jest.fn(() => {
                throw error;
            }),
            getUserByPk: jest.fn(() => {
                throw error;
            }),
            getAutoSuggestUsers: jest.fn(() => {
                throw error;
            }),
            deleteUser: jest.fn(() => {
                throw error;
            })
        };
        responseMock = {
            status: jest.fn(() => responseMock),
            json: jest.fn(() => responseMock)
        } as any;
        userController = new UserController(mockService as UserService);
        nextFunctionMock = jest.fn();
    });

    test('#login: Should throw Error if user not login succesfully', async () => {
        requestMock.body = userCredentialErrorMock;
        await userController.login(requestMock, responseMock, nextFunctionMock);
        expect(mockService.findOneByField).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });

    test('#saveUser: Should throw Error if user not saved succesfully', async () => {
        requestMock.body = {};
        await userController.saveUser(requestMock, responseMock, nextFunctionMock);
        expect(mockService.upsertUser).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });

    test('#updateUser: Should throw Error if user not updated succesfully', async () => {
        requestMock.params = {
            id: userMock.id
        };
        requestMock.body = {};
        await userController.updateUser(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getUserByPk).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });

    test('#getUser: Should throw Error if user not finded by id succesfully', async () => {
        requestMock.params = {
            id: userMock.id
        };
        await userController.getUser(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getUserByPk).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });

    test('#getUsers: Should throw Error if users not fetched succesfully', async () => {
        requestMock.query = {
            loginSubstring: 'log'
        };
        await userController.getUsers(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getAutoSuggestUsers).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });

    test('#removeUser: Should throw Error if user not removed succesfully', async () => {
        requestMock.params = {
            id: userMock.id
        };
        await userController.removeUser(requestMock, responseMock, nextFunctionMock);
        expect(mockService.deleteUser).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });
});
