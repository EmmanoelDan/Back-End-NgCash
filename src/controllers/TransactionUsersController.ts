import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";
import { AccountService } from "../services/UserDebitService";
import { UseCreditService } from "../services/UserCreditService";

class TransactionsUsersController {
    async handle(request: Request, response: Response){
        const {id} = request.user
        const {creditedAccount, username, value} = request.body;

        const userDebited = new AccountService;
        const userCredited = new UseCreditService;
        const dataDebited = await userDebited.executeUserDebited({
            id,
            username,
            value
        })

        const dataCredited = await userCredited.execute({
            creditedAccount
        })

        if(dataDebited.userDebited.accountId === dataCredited.accountId ){
            return response.json("Nao pode ser auto transfer")
        }
        if(username != dataCredited.username ){
            return response.json("Not")
        }

        if(!userCredited){
            return response.json("Usuario nao existe")
        }

        const userCashIn = await prismaClient.account.findFirst({
            where: {
                id: dataCredited.accountId
            }
        })

        if(!userCashIn){
            return response.json("Error in transaction")
        }

        const balanceCashOut = Number(dataDebited.userCashOut.balance) - Number(value);
        const balanceCashIn = Number(userCashIn.balance) + Number(value);

        const transaction = await prismaClient.transaction.create({
            data: {
                debitedAccountId: dataDebited.userDebited.accountId,
                creditedAccountId: dataCredited.accountId,
                value: value 
            }
        })

        await prismaClient.account.update({
            where: {
                id: userCashIn.id
            }, 
            data: {
                balance: balanceCashIn
            }
        })

        await prismaClient.account.update({
            where: {
                id: dataDebited.userCashOut.id
            }, data: {
                balance: balanceCashOut
            }
        })
        
        return response.json(transaction);

    }
    
}

export {TransactionsUsersController}