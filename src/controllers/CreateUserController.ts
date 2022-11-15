import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateUserController {
    async handle(request: Request, response: Response){
        const {username, password} = request.body;

       const user = await prismaClient.user.create({
        data: {
            username,
            password
        }
       })

        return response.json(user);
    }
}