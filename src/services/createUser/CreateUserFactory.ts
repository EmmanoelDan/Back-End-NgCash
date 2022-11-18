import { CreateUserService } from "./CreateUserService";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository"
import { CreateUserController } from "./CreateUserController";


export const createUserFactory = () => {
    const userRepository = new PrismaUsersRepository();
    const createUser = new CreateUserService(userRepository);
    const createUserController = new CreateUserController(createUser);
    return createUserController;
}