export interface UserEntity {
    id: string;
    name: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export interface UserLoginEntity {
    login: string;
    password: string;
}