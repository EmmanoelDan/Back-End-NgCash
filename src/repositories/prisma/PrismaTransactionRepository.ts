import { prismaClient } from "../../database/prismaClient";
import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../ITransactionRepository";

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
                    gte: user.data
                },
                debitedAccountId: user?.debitedAccountId
            }
        })

        return (filter as Transaction);
    }

    async filterDebited(user: Transaction): Promise<Transaction> {
        const filter = await prismaClient.transaction.findMany({
            where: {
                created_at: {
                    gte: user.data
                }
            }
        })

        return filter as Transaction
    }

    async credited(user: Transaction): Promise<Transaction> {
        const filter = await prismaClient.transaction.findMany({
            where: {
                creditedAccountId: user.creditedAccountId
            }
        })

        return filter as Transaction;
    }

    async debited(user: Transaction): Promise<Transaction> {
        const filter = await prismaClient.transaction.findMany({
            where: {
                debitedAccountId: user.creditedAccountId
            }
        })

        return filter as Transaction;
    }
}

export {PrismaTransactionRepository};