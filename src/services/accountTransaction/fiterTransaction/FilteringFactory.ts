import { PrismaTransactionRepository } from "../../../repositories/prisma/PrismaTransactionRepository";
import { FilteringService } from "./FilteringService";
import { FilteringControler } from "./FilteringController";

export const filteringFactory = () => {
    const transactionRepository = new PrismaTransactionRepository();
    const filterService = new FilteringService(transactionRepository);
    const filteringControler = new FilteringControler(filterService);
    return filteringControler;
}