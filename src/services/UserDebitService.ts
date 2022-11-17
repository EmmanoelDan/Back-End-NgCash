import { prismaClient } from "../database/prismaClient";

interface IAccountDebit {
    id: String,
    username: String,
    value: Number
}

class UserDebitedService {
    async executeUserDebited({id, username, value} : IAccountDebit) {
        const userDebited = await prismaClient.user.findFirst({
            where: {
                id: String (id)
            }
        })

        if(!userDebited){
            throw new Error("Error ao realizar tranzacao")
        }

        const userCashOut = await prismaClient.account.findFirst({
            where: {
                id: userDebited.accountId
            }
        })

        if(userDebited.username === username){
            throw new Error("Voce nao pode fazer auto transaction")
        }

        if(!userCashOut){
            throw new Error("Error no usuario debitado")
        }

        const valor = await getValue(value)

        if(valor > Number(userCashOut.balance)){
            throw new Error("Saldo insuficiente")
        }

        const data = {
            userDebited: userDebited,
            userCashOut: userCashOut
        }
        
        return data;
    }
}

async function getValue(value: Number) {
    return value;
}

export { UserDebitedService }