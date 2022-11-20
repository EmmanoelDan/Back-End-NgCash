import { prismaClient } from "../../database/prismaClient";
import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../ITransactionRepository";

/**
 * Class TransactionRepository:
 * Responsible for saving to the database, and returns the data to the service layer. It is perceived that this layer of application, has an implementation of a contract.
 * @create -> create new transaction
 * @filterCredited -> filters transaction date / Credited
 * @dilterDebited -> filters transaction date / Dedited
 * @credited -> Getting Account User / Credited
 * @debited -> Getting Account User / Debited
 */

class PrismaTransactionRepository implements ITransactionRepository{
    async create(user: Transaction): Promise<Transaction> {
        const transaction = await prismaClient.transaction.create({
            data: {
                value: user.value,
                creditedAccountId: user.creditedAccountId,
                debitedAccountId: user.debitedAccountId
            }
        })

        return transaction;
    }

    async filterCredited(user: Transaction): Promise<Transaction> {
        const filter = await prismaClient.transaction.findMany({
            where: {
                created_at: {
                    gte: user.date
                },
                creditedAccountId: user.accountId
            }
        })

        return (filter as Transaction);
    }

    async filterDebited(user: Transaction): Promise<Transaction> {
        const filter = await prismaClient.transaction.findMany({
            where: {
                created_at: {
                    gte: user.date
                },
                creditedAccountId: user.accountId
            }
        })

        return filter as Transaction
    }

    async credited(user: Transaction): Promise<Transaction> {
        const filter = await prismaClient.transaction.findMany({
            where: {
                id: user.accountId
            }
        })

        return filter as Transaction;
    }

    async debited(user: Transaction): Promise<Transaction> {
        const filter = await prismaClient.transaction.findMany({
            where: {
                id: user.accountId
            }
        })

        return filter as Transaction;
    }
}

export {PrismaTransactionRepository};