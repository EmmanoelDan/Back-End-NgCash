import { compare } from "bcryptjs";
import { prismaClient } from "../../database/prismaClient";
import { IUserRepository } from "../../repositories/IUserRepositories";
import { sign } from "jsonwebtoken";
import "../../../config/jwtConfig";
import jwtConfig from "../../../config/jwtConfig"

interface AuthUserRequest {
    username: String,
    password: String
}

export class UserAuthService {
    constructor(private userRepository: IUserRepository){}

    async execute({username, password}: AuthUserRequest){

        const user = await prismaClient.user.findFirst({
            where: {
                username: String (username)
            }
        })

        if(!user){
            throw new Error("User/Password incorrect")
        }

        const passwordMatch = await compare(String(password), user.password);

        if(!passwordMatch){
            throw new Error("User/Password incorrect")
        }

        const token = sign({id: user.id, username: user.username}, jwtConfig.secretKey, {
            expiresIn: jwtConfig.expirenTime
        })

        return {id: user.id, username: user.username, token}

    }


}