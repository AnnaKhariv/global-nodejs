import { Sequelize, Repository } from 'sequelize-typescript';
import { GroupService } from './group.service';
import Group from '../../db/models/group.model';

import { groupMock, groupEntityMock } from '../../mocks/group.mock';
import { userMock } from '../../mocks/user.mock';
import log from '../../logger';

jest.doMock('sequelize');
jest.doMock('sequelize-typescript');
jest.doMock('../../db/models/user.model');
jest.doMock('../../db/models/group.model');
jest.doMock('../../db/models/user-group.model');

let groupService: GroupService;
let mockDb;
let mockSequelize;
const usersIds = [userMock.id];
const deletedRows = 1;

describe('# Group Service #', () => {
    beforeAll(() => {
        mockSequelize = {
            transaction: jest.fn(() => ({
                commit: jest.fn()
            })),
            models: {
                User: {
                    findByPk: jest.fn(() => userMock)
                },
                UserGroup: {
                    upsert: jest.fn()
                }
            }
        };

        mockDb = {
            upsert: jest.fn(() => [groupMock]),
            findByPk: jest.fn(() => groupMock),
            destroy: jest.fn(() => deletedRows),
            findAll: jest.fn(() => [groupMock])
        };
        groupService = new GroupService(mockSequelize as Sequelize, mockDb as Repository<Group>);
    });

    test('#addUsersToGroup: Should add user to group and save to db', async () => {
        const res = await groupService.addUsersToGroup(groupEntityMock, usersIds);
        expect(mockDb.upsert).toHaveBeenCalled();
        expect(mockSequelize.transaction).toHaveBeenCalled();
        expect(res).toEqual([groupMock]);
    });

    test('#getGroups: Should get groups from db', async () => {
        const res = await groupService.getGroupByPk(groupEntityMock.id);
        expect(mockDb.findByPk).toHaveBeenCalled();
        expect(res).toEqual(groupMock);
    });

    test('#getGroupByPk: Should get group by id from db', async () => {
        const res = await groupService.getGroups();
        expect(mockDb.findAll).toHaveBeenCalled();
        expect(res).toEqual([groupMock]);
    });

    test('#deleteGroup: Should delete group by id from db', async () => {
        const res = await groupService.deleteGroup(groupEntityMock.id);
        expect(mockDb.findByPk).toHaveBeenCalled();
        expect(mockDb.destroy).toHaveBeenCalled();
        expect(res).toEqual(deletedRows);
    });
});

describe('# Group Service - Error handling #', () => {
    beforeAll(() => {
        mockSequelize = {
            transaction: jest.fn(() => ({
                rollback: jest.fn()
            })),
            models: {
                User: {
                    findByPk: jest.fn(() => userMock)
                },
                UserGroup: {
                    upsert: jest.fn(() => {
                        throw new Error('Error');
                    })
                }
            }
        };

        mockDb = {
            upsert: jest.fn(() => [groupMock]),
            findByPk: jest.fn(() => null)
        };
        groupService = new GroupService(mockSequelize as Sequelize, mockDb as Repository<Group>);
    });

    test('#addUsersToGroup: Should throw Error if user not added to group or records not saved to db', async () => {
        jest.spyOn(log, 'error').mockImplementation(jest.fn());
        try {
            await groupService.addUsersToGroup(groupEntityMock, usersIds);
        } catch (err) {
            expect(mockDb.upsert).toHaveBeenCalled();
            expect(mockSequelize.transaction).toHaveBeenCalled();
            expect(err.name).toEqual('HttpRequestError');
            expect(err.message).toEqual(`Unable to save record = ${JSON.stringify(groupEntityMock)}`);
        }
    });

    test('#getGroupByPk: Should throw Error if group not get by id from db', async () => {
        try {
            await groupService.getGroupByPk(groupEntityMock.id);
        } catch (err) {
            expect(mockDb.findByPk).toHaveBeenCalled();
            expect(err.name).toEqual('HttpRequestError');
            expect(err.message).toEqual(`Unable to find record with id = ${groupMock.id}`);
        }
    });

    test('#deleteGroup: Should throw Error if group not deleted from db', async () => {
        try {
            await groupService.deleteGroup(groupEntityMock.id);
        } catch (err) {
            expect(mockDb.findByPk).toHaveBeenCalled();
            expect(err.name).toEqual('HttpRequestError');
            expect(err.message).toEqual(`Unable to find record with id = ${groupMock.id}`);
        }
    });
});
