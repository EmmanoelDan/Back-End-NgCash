import { User } from "../entities/User"

// Contract User Entities

export interface IUserRepository {
    create(user: User): Promise<User>
    exists(username: string): Promise<boolean>
}
