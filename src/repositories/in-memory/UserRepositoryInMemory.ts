import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepositories";
import {v4 as uuid} from "uuid"


class UserRepositoryInMemory implements IUserRepository {
    private user: User[] = [];

    async create(user: User): Promise<User> {
       Object.assign(user, {
        id: uuid(),
       });

       this.user.push(user);
       return user;
    }

    async exists(username: string): Promise<boolean> {
        const user = this.user.some((user) => user.username === username);
        return user;
    }

}

export {UserRepositoryInMemory}