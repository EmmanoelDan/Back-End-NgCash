import { hash } from "bcryptjs";
import { prismaClient } from "../database/prismaClient";
import { CreateUserInterface } from "../interfaces/CreateUserInterface";

class CreateUserService {
    async execute({username, password}: CreateUserInterface){
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