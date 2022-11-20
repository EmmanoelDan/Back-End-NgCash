import { prismaClient } from "../../database/prismaClient";
import { Account } from "../../entities/Account";
import { IAccountRepository } from "../IAccountRepository";

/**
 * Class AccountRepository:
 * Responsible for saving to the database, and returns the data to the service layer. It is perceived that this layer of application, has an implementation of a contract.
 * @cashOut -> Getting the Account of CashOut
 * @cashOut -> Getting the Account of CashIn
 */

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