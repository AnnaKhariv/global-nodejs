import { User } from '../entity/user.entity';

export const findIndex = (users: User[], id: string) => users.indexOf(users.find(user => user.id === id));
