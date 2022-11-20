/***
 * Entitie Transaction:
 *  Get intancesof the entities, used in database
 */

class Transaction {
    id?: string;
    debitedAccountId?: string;
    creditedAccountId?: string;
    accountId?;
    date?;
    value?
    private constructor({debitedAccountId, creditedAccountId,accountId, date, value }: Transaction) {
      return Object.assign(this, {
        debitedAccountId,
        creditedAccountId,
        accountId,
        date,
        value,
      });
    }
  
    static create({ debitedAccountId, creditedAccountId, accountId, date, value }: Transaction) {
      const transaction = new Transaction({ debitedAccountId, creditedAccountId, accountId, date, value });
      return transaction;
    }
  }
  
  export { Transaction };