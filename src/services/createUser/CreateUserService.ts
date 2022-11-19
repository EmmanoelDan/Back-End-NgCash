import { User } from "../../entities/User";
import { hash } from "bcryptjs";
import { IUserRepository} from "../../repositories/IUserRepositories";
import z, { discriminatedUnion } from "zod"

interface CreateUserRequest {
    username: String,
    password: String
}

const  PASSWORD_VALIDATION_REGEX  = /((?=.*\d))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

export class CreateUserService {
    constructor(private userRepository: IUserRepository){}
    
    async execute({username, password}: CreateUserRequest){
        const userAreadyExists = await this.userRepository.exists(String(username));
        
        if(userAreadyExists){
            throw new Error("User Already Exists!!")
        }

        const data = z.object({
            username: z.string().min(3),
            password: z.string().min(8).regex(PASSWORD_VALIDATION_REGEX)
        })

        if(!data){
            throw new Error("Username/Password Invalid ")
        }

        const passwordHash = await hash(String(password), 8)
        const userCreate = User.create({username: String (username), password: passwordHash})
        const user = await this.userRepository.create(userCreate)

        return user
    }
}