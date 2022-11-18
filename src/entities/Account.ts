class Account {
    id?;
    balance?;
  
    private constructor({id}: Account) {
      return Object.assign(this, {
        id
      });
    }
  
    static create({ id }: Account) {
      const account = new Account({ id });
      return account;
    }
  }
  
  export { Account };