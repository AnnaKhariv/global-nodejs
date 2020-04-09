import { GroupEntity } from '../entities/group.entity';
import Group from '../db/models/group.model';

const groupEntityMock: GroupEntity = {
    id: '4944fbd0-0869-4d94-84a1-171afc1e103d',
    name: 'guest',
    permissions: ['READ']
};

const groupWithUsersMock: GroupEntity = {
    id: '4944fbd0-0869-4d94-84a1-171afc1e103d',
    name: 'guest',
    permissions: ['READ'],
    users: ['4944fbd0-0869-4d94-84a1-171afc1e103d']
};

const groupMock = {
    id: '4944fbd0-0869-4d94-84a1-171afc1e103d',
    name: 'guest',
    permissions: ['READ']
} as Group;

export {
    groupEntityMock,
    groupWithUsersMock,
    groupMock
};
