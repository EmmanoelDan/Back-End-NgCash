import { Account } from "../entities/Account"

// Contract Account Entities

export interface IAccountRepository {
    cashOut(account: Account): Promise<Account>
    cashIn(account: Account): Promise<Account>
}