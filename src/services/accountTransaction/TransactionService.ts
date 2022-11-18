import { prismaClient } from "../../database/prismaClient";
import { Transaction } from "../../entities/Transaction";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";
import { CreditedAccount } from "./CreditedAccount";
import { DebitedAccount } from "./DebitedAccount";

interface TransactionServiceRequest {
    id: String;
    creditedAccountId;
    username;
    value;
}

class TransactionService {
    constructor(private transactionRepository: ITransactionRepository){
    }
    async execute({id, creditedAccountId, username, value}: TransactionServiceRequest){

        const userDebited = new DebitedAccount;
        const userCredited = new CreditedAccount;
        const dataDebited = await userDebited.executeUserDebited({
            id,
            username,
            value
        })

        const dataCredited = await userCredited.execute({
            creditedAccountId: (creditedAccountId),
            username
        })

        if(dataDebited.userDebited.accountId === dataCredited.accountId ){
            throw new Error("Nao pode ser auto transfer")
        }

        const userCashIn = await prismaClient.account.findFirst({
            where: {
                id: dataCredited.accountId
            }
        })

        if(!userCashIn){
            throw new Error("Nao pode ser auto transfer")
        }

        const balanceCashOut = Number(dataDebited.userCashOut.balance) - Number(value);
        const balanceCashIn = Number(userCashIn.balance) + Number(value);

        const data = Transaction.create({
            value: value,
            creditedAccountId: dataCredited.accountId,
            debitedAccountId: dataDebited.userDebited.accountId
        })

        const transaction = await this.transactionRepository.create(data)

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
        
        return transaction;

    }

}

export {TransactionService}