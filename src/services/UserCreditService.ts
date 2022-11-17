import { prismaClient } from "../database/prismaClient";

interface IAccountCredit {
    creditedAccount: String,
    username: String
}

class UseCreditService {
    async execute({creditedAccount, username}: IAccountCredit){
        const userCredited= await prismaClient.user.findFirst({
            where: {
                accountId: String (creditedAccount)
            }, select: {
                id: true,
                username: true,
                accountId: true
            }
        })

        if(username != userCredited.username ){
            throw new Error("Error")
        }

        if(!userCredited){
            throw new Error("Error")
        }

        const userCashIn = await prismaClient.account.findFirst({
            where: {
                id: userCredited.accountId
            }
        })

        if(!userCashIn){
            throw new Error("Error")
        }

        return userCredited;
    }
}

export {UseCreditService}