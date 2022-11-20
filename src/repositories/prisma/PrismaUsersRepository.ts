import { prismaClient } from "../../database/prismaClient";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepositories";

/**
 * Class AccountRepository:
 * Responsible for saving to the database, and returns the data to the service layer. It is perceived that this layer of application, has an implementation of a contract.
 * @exists -> checks whether the use exists
 * @create
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

  async indexUserDebited(user: User): Promise<User> {
      const userEnvie = await prismaClient.user.findFirst({
        where: {
          id: String (user.id)
        }
      })

      return userEnvie;
  }

  async indexUserCredited(user: User): Promise<User> {
    const userReceive = await prismaClient.user.findFirst({
      where: {
        id: String (user.id)
      }
    })

    return userReceive;
  }

  
}

export { PrismaUsersRepository };