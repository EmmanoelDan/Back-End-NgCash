import { PrismaTransactionRepository } from "../../repositories/prisma/PrismaTransactionRepository";
import { TransactionService } from "./TransactionService";
import { TransactionController } from "./TransactionController";

export const transactionFactory = () => {
    const transactionRepository = new PrismaTransactionRepository();
    const transactionService = new TransactionService(transactionRepository);
    const transactionController = new TransactionController(transactionService);
    return transactionController;
}