class Transaction {
    id?: String;
    debitedAccountId?: string;
    creditedAccountId?: string;
    data?;
    value?
  
    private constructor({debitedAccountId, creditedAccountId, data, value }: Transaction) {
      return Object.assign(this, {
        debitedAccountId,
        creditedAccountId,
        data,
        value
      });
    }
  
    static create({ debitedAccountId, creditedAccountId, data, value }: Transaction) {
      const transaction = new Transaction({ debitedAccountId, creditedAccountId, data, value });
      return transaction;
    }
  }
  
  export { Transaction };