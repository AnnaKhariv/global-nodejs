import { Model } from 'sequelize';

export interface User extends Model {
    name: string;
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}
