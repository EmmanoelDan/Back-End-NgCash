import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { UserBalanceService } from "../services/UserBalanceService";



class UserBalanceController {
    async handle(request: Request, response: Response){
        const { id } = request.user;

        const user = await prismaClient.user.findFirst({
            where: {
                id: id
            }
        })

        const account = await prismaClient.account.findFirst({
            where: {
                id: user.accountId
            }
        })

        return response.json(account)
    }
}

export {UserBalanceController}