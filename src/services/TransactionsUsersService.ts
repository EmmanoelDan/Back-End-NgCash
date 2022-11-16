import { prismaClient } from "../database/prismaClient";


interface ITransaction {
    debitedAccountId: string,
    creditedAccountId: string,
    value: number
}

class TransactionsUsersService {
    async execute({debitedAccountId, creditedAccountId, value}: ITransaction){

        const transaction = await prismaClient.transaction.create({
            data: {
                creditedAccountId,
                debitedAccountId,
                value
            }
        })
        return transaction;
    }
}

export {TransactionsUsersService}