import User from '../db/models/user.model';
import { UserLoginEntity } from '../entities/user.entity';

const userMock = {
    id: '121e2a95-eca6-4799-9df5-284033305730',
    login: 'login',
    password: 'password',
    age: 100,
    isDeleted: false,
    name: 'name'
} as User;

const deletedUserMock = {
    id: '121e2a95-eca6-4799-9df5-284033305730',
    login: 'login',
    password: 'password',
    age: 100,
    isDeleted: true,
    name: 'name'
} as User;

const userCredentialMock: UserLoginEntity = {
    login: 'login',
    password: 'password'
};

const userCredentialErrorMock: UserLoginEntity = {
    login: 'login',
    password: 'different'
};

export {
    userMock,
    deletedUserMock,
    userCredentialMock,
    userCredentialErrorMock
};
