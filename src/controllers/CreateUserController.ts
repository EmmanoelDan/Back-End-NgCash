import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateUserController {
    async handle(request: Request, response: Response){
        const {username, password, accountId} = request.body;

        const user = await prismaClient.user.create({
        data: {
            username,
            password,
            accountId
        }
       })

        return response.json(user);
    }
}