import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class CreateAccountController {
    async handle(request: Request, response: Response){
        const {balance} = request.body;

        const account = await prismaClient.account.create({
            data: {
                balance
            }
        })

        return response.json(account);
    }
}