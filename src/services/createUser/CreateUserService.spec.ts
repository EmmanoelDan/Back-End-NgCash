import { User } from "../../entities/User";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { IUserRepository } from "../../repositories/IUserRepositories"
import { CreateUserService } from "./CreateUserService";

describe("Create user", () => {
    let usersRepository: IUserRepository;
    let createUserService: CreateUserService;
  
    beforeAll(() => {
      usersRepository = new UserRepositoryInMemory();
      createUserService = new CreateUserService(usersRepository);
    });
  
    it("should be able to create a new user", async () => {
      const userData: User = {
        username: "testusername",
        password: "testpassword"
      };
  
      const user = await createUserService.execute(userData);
  
      expect(user).toHaveProperty("id");
      expect(user.username).toBe("testusername");
    });
  
    it("should not be able to create an existing user", async () => {
      const userData: User = {
        username: "testexisting",
        password: "testpasswordexisting"
      };
  
      await createUserService.execute(userData);
  
      await expect(createUserService.execute(userData)).rejects.toEqual(
        new Error("User Already Exists!!")
      );
    });
  });
