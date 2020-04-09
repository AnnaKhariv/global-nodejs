import { Request, Response } from 'express';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

import { groupMock, groupEntityMock, groupWithUsersMock } from '../../mocks/group.mock';

jest.doMock('express');

let groupController: GroupController;
let mockService;
const requestMock: Request = {} as any;
let responseMock: Response;
let nextFunctionMock;
const SUCCESS = 201;
const NO_CONTENT = 204;

describe('# Group Controller #', () => {
    beforeAll(() => {
        mockService = {
            upsertGroup: jest.fn(() => [groupMock]),
            getGroupByPk: jest.fn(() => groupMock),
            getGroups: jest.fn(() => [groupMock]),
            deleteGroup: jest.fn(),
            addUsersToGroup: jest.fn(() => [groupMock])
        };
        responseMock = {
            status: jest.fn(() => responseMock),
            json: jest.fn(() => responseMock),
            send: jest.fn()
        } as any;
        groupController = new GroupController(mockService as GroupService);
        nextFunctionMock = jest.fn();
    });

    test('#saveGroup: Should return appropriate response if group saved succesfully', async () => {
        requestMock.body = groupEntityMock;
        await groupController.saveGroup(requestMock, responseMock, nextFunctionMock);
        expect(mockService.upsertGroup).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith(groupMock);
    });

    test('#saveGroup with users: Should return appropriate response if group saved succesfully', async () => {
        requestMock.body = groupWithUsersMock;
        await groupController.saveGroup(requestMock, responseMock, nextFunctionMock);
        expect(mockService.addUsersToGroup).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith(groupMock);
    });

    test('#updateGroup: Should return appropriate response if group updated succesfully', async () => {
        requestMock.params = {
            id: groupEntityMock.id
        };
        requestMock.body = groupMock;
        await groupController.updateGroup(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getGroupByPk).toHaveBeenCalled();
        expect(mockService.upsertGroup).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith(groupMock);
    });

    test('#getGroup: Should return appropriate response if group finded by id succesfully', async () => {
        requestMock.params = {
            id: groupEntityMock.id
        };
        await groupController.getGroup(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getGroupByPk).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith(groupMock);
    });

    test('#getGroups: Should return appropriate response if groups fetched succesfully', async () => {
        await groupController.getGroups(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getGroups).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(SUCCESS);
        expect(responseMock.json).toHaveBeenCalledWith([groupMock]);
    });

    test('#removeGroup: Should return appropriate response if group removed succesfully', async () => {
        requestMock.params = {
            id: groupEntityMock.id
        };
        await groupController.removeGroup(requestMock, responseMock, nextFunctionMock);
        expect(mockService.deleteGroup).toHaveBeenCalled();
        expect(responseMock.status).toHaveBeenCalledWith(NO_CONTENT);
        expect(responseMock.send).toHaveBeenCalled();
    });
});

describe('# Group Controller - Error handling #', () => {
    const error = new Error('Error');

    beforeAll(() => {
        mockService = {
            upsertGroup: jest.fn(() => {
                throw error;
            }),
            getGroupByPk: jest.fn(() => {
                throw error;
            }),
            getGroups: jest.fn(() => {
                throw error;
            }),
            deleteGroup: jest.fn(() => {
                throw error;
            })
        };
        responseMock = {
            status: jest.fn(() => responseMock),
            json: jest.fn(() => responseMock),
            send: jest.fn()
        } as any;
        groupController = new GroupController(mockService as GroupService);
        nextFunctionMock = jest.fn();
    });

    test('#saveGroup: Should throw Error if group not saved succesfully', async () => {
        requestMock.body = {};
        await groupController.saveGroup(requestMock, responseMock, nextFunctionMock);
        expect(mockService.upsertGroup).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });

    test('#updateGroup: Should throw Error if group not updated succesfully', async () => {
        requestMock.params = {
            id: groupEntityMock.id
        };
        requestMock.body = {};
        await groupController.updateGroup(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getGroupByPk).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });

    test('#getGroup: Should throw Error if group not finded by id succesfully', async () => {
        requestMock.params = {
            id: groupEntityMock.id
        };
        await groupController.getGroup(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getGroupByPk).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });

    test('#getGroups: Should throw Error if groups not fetched succesfully', async () => {
        await groupController.getGroups(requestMock, responseMock, nextFunctionMock);
        expect(mockService.getGroups).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });

    test('#removeGroup: Should throw Error if group not removed succesfully', async () => {
        requestMock.params = {
            id: groupEntityMock.id
        };
        await groupController.removeGroup(requestMock, responseMock, nextFunctionMock);
        expect(mockService.deleteGroup).toHaveBeenCalled();
        expect(nextFunctionMock).toHaveBeenCalled();
    });
});
