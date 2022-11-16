
import { hash } from "bcryptjs";
import { prismaClient } from "../database/prismaClient";

interface UserRequest {
    username: string;
    password: string
}

class CreateUserService {
    async execute({username, password}: UserRequest){
        if(!username){
            throw new Error("Username incorrect!")
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                username: username
            }
        })

        if(userAlreadyExists){
            throw new Error("User alredy exists");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                username,
                password: passwordHash,
                account: {
                    create: {
                    }
                }
            }
        })

        return user;
    }
}

export {CreateUserService}