import { hash } from "bcrypt";
import { Request, Response } from "express";
import { prismaClient } from "../../database/prismaClient";
import { createUserSchema } from "./User";

export class CreateUserController {
    async handle(request: Request, response: Response){
        try {
            const {username, password} = request.body;

            const credentials = createUserSchema.safeParse(request.body);
            if(!credentials.success){
                console.log(credentials.error.errors[0].message)
                return response.json(credentials.error.errors[0].message)
            }
            console.log(credentials)

            let user = await prismaClient.user.findUnique({where: {username}})

            if(user){
                return response.json({error: "There is already a user with this username!!"})
            }

            const passwordHash = await hash(password, 8)

            user = await prismaClient.user.create({
            data: {
                username,
                password: passwordHash,
                account: {
                    create: {}
                }
            }
            })
            return response.json(user);   
        } catch (error) {
            return response.json(error)
        }
        
    }
}