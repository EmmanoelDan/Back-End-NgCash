import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository"
import { UserAuthService } from "./UserAuthService";
import { UserAuthController } from "./UserAuthController";

export const userAuthFactory = () => {
    const userRepository = new PrismaUsersRepository();
    const userAuth = new UserAuthService(userRepository);
    const userAuthController = new UserAuthController(userAuth);
    return userAuthController;
}