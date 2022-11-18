import { prismaClient } from "../../database/prismaClient";
import { Account } from "../../entities/Account";
import { IAccountRepository } from "../IAccountRepository";

class PrismaAccountRepository implements IAccountRepository {
    async cashOut(account: Account): Promise<Account> {
        const cashOut = await prismaClient.account.findFirst({
            where: {
                id: String (account.id)
            }
        })
        return cashOut;
    }

    async cashIn(account: Account): Promise<Account> {
        const cashIn = await prismaClient.account.findFirst({
            where: {
                id: String (account.id)
            }
        })
        return cashIn;
    }
}

export { PrismaAccountRepository }