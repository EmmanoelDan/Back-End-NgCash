class User {
    id?: String;
    username: String;
    password: String;
  
    private constructor({username, password }: User) {
      return Object.assign(this, {
        username,
        password
      });
    }
  
    static create({ username, password }: User) {
      const user = new User({ username, password });
      return user;
    }
  }
  
  export { User };