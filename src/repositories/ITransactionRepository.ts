import { Transaction } from "../entities/Transaction"

export interface ITransactionRepository {
    create(user: Transaction): Promise<Transaction>
    filterDebited(user: Transaction): Promise<Transaction>
    filterCredited(user: Transaction): Promise<Transaction>
    debited(user: Transaction): Promise<Transaction>
    credited(user: Transaction): Promise<Transaction>
}