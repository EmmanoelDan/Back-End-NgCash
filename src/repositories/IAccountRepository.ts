import { Account } from "../entities/Account"

export interface IAccountRepository {
    cashOut(account: Account): Promise<Account>
    cashIn(account: Account): Promise<Account>
}