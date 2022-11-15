import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateUserController {
    async handle(request: Request, response: Response){
        try {
            const {username, password, accountId} = request.body;

            if(username.length < 3){
                return response.json({error: "User Name must be at least 3 characters long!!"})
            }

            let user = await prismaClient.user.findUnique({where: {username}})

            if(user){
                return response.json({error: "There is already a user with this username"})
            }

            user = await prismaClient.user.create({
            data: {
                username,
                password,
                accountId
            }
            })
            return response.json(user);   
        } catch (error) {
            return response.json(error)
        }
        
    }
}