import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

class TransactionsUsersController {
    async handle(request: Request, response: Response){
        const {id} = request.user
        const {creditedAccount, username, value} = request.body;
        
        const userDebited = await prismaClient.user.findFirst({
            where: {
                id: id
            }
        })

        //console.log(userDebited)

        if(!userDebited){
            return response.json("Error ao realizar tranzacao")
        }

        //console.log(userDebited.accountId)

        const userCashOut = await prismaClient.account.findFirst({
            where: {
                id: userDebited.accountId
            }
        })

        if(userDebited.username === username){
            return response.json("Voce nao pode fazer auto transaction")
        }

        if(!userCashOut){
            return response.json("Ërror no usuario debitado")
        }

        if(value > userCashOut.balance){
            return response.json("Saldo insuficiente")
        }

        const userCredited= await prismaClient.user.findFirst({
            where: {
                accountId: creditedAccount
            }, select: {
                id: true,
                username: true,
                accountId: true
            }
        })

        if(userDebited.accountId === userCredited.accountId ){
            return response.json("Nao pode ser auto transfer")
        }
        if(username != userCredited.username ){
            return response.json("Not")
        }

        if(!userCredited){
            return response.json("Usuario nao existe")
        }

        const userCashIn = await prismaClient.account.findFirst({
            where: {
                id: userCredited.accountId
            }
        })

        if(!userCashIn){
            return response.json("Error in transaction")
        }

        const balanceCashOut = Number(userCashOut.balance) - (parseFloat(value));
        const balanceCashIn = Number(userCashIn.balance) + (parseFloat(value));

        const transaction = await prismaClient.transaction.create({
            data: {
                debitedAccountId: userDebited.accountId,
                creditedAccountId: userCredited.accountId,
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
                id: userCashOut.id
            }, data: {
                balance: balanceCashOut
            }
        })
        
        return response.json(transaction);

    }
}

export {TransactionsUsersController}