import { prismaClient } from "../../database/prismaClient";

interface IAccountCredit {
    creditedAccountId;
    username;
}

class CreditedAccount {
    async execute({creditedAccountId, username}: IAccountCredit){
        const userCredited= await prismaClient.user.findFirst({
            where: {
                accountId: creditedAccountId
            }, select: {
                id: true,
                username: true,
                accountId: true
            }
        })

        console.log(userCredited.username)

        if(username != userCredited.username){
            throw new Error("Error")
        }

        if(!userCredited){
            throw new Error("Error")
        }

        return userCredited;
    }
}

export {CreditedAccount}