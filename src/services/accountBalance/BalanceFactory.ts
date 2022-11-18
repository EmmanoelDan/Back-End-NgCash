import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository"
import { BalanceController } from "./BalanceController";
import { BalanceService } from "./BalanceService";


export const balanceFactory = () => {
    const userRepository = new PrismaUsersRepository();
    const balance = new BalanceService(userRepository);
    const balanceController = new BalanceController(balance);
    return balanceController;
}