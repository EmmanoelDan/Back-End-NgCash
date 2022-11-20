import { prismaClient } from "../../database/prismaClient";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepositories";

/**
 * Class AccountRepository:
 * Responsible for saving to the database, and returns the data to the service layer. It is perceived that this layer of application, has an implementation of a contract.
 * @exists -> checks whether the use exists
 * @create -> create new user
 */

class PrismaUsersRepository implements IUserRepository {
  async exists(username: string): Promise<boolean> {
    const user = await prismaClient.user.findUnique({
      where: {
        username,
      },
    });

    return !!user;
  }

  async create({ username, password }: User): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        username: String (username),
        password: String (password),
        account: {
            create: {
            }
        }
      },
    });

    return user;
  }

  
}

export { PrismaUsersRepository };