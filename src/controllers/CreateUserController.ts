import { hash } from "bcrypt";
import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import {z} from "zod"

const PASSWORD_VALIDATION_REGEX = /((?=.*\d))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

export class CreateUserController {
    async handle(request: Request, response: Response){
        try {
            const {username, password} = request.body;

            const dataValues = z.object({
                username: z.string().min(3),
                password: z.string().regex(PASSWORD_VALIDATION_REGEX, "Invalid Password!").min(8)
            })

            const credentials = dataValues.safeParse(request.body);
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