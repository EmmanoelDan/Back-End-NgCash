import { User } from "../../entities/User";
import { hash } from "bcryptjs";
import { IUserRepository} from "../../repositories/IUserRepositories";

interface CreateUserRequest {
    username: String,
    password: String
}

export class CreateUserService {
    constructor(private userRepository: IUserRepository){}
    
    async execute({username, password}: CreateUserRequest){
        const userAreadyExists = await this.userRepository.exists(String(username));
        
        if(userAreadyExists){
            throw new Error("User Already Exists!!")
        }

        const passwordHash = await hash(String(password), 8)
        const userCreate = User.create({username: String (username), password: passwordHash})
        const user = await this.userRepository.create(userCreate)

        return user
    }
}