import { prismaClient } from "../../../database/prismaClient";
import { Transaction } from "../../../entities/Transaction";
import { ITransactionRepository } from "../../../repositories/ITransactionRepository";

interface filterTransactionRequest {
    id,
    transaction,
    date
}

class FilteringService {
    constructor(private transaction: ITransactionRepository){
    }

    async execute({id, transaction, date}: filterTransactionRequest){
        const user = await prismaClient.user.findFirst({
            where: {
                id: id
            }
        })

        console.log(user.accountId)

        const dataFilterCashIn = Transaction.create({
            date: date,
            creditedAccountId: user?.accountId
        })
        
        const dataFilterCashOut = Transaction.create({
            date: date,
            debitedAccountId: user?.accountId
        })

        const data = Transaction.create({
            date: date
        })

        const credited = Transaction.create({
            creditedAccountId: user?.accountId
        })

        const debited = Transaction.create({
            debitedAccountId: user?.accountId
        })

        let filtering;

        if(date || transaction) {
            if(date && transaction){
                if(String(transaction).toLocaleLowerCase() === "CashIn"){
                    
                    filtering = await this.transaction.filterCredited(dataFilterCashIn)
                }

                if(String(transaction).toLocaleLowerCase() === "CashOut"){
                    filtering = await this.transaction.filterDebited(dataFilterCashOut)
                }
                }
            else {
                if(String(transaction).toLocaleLowerCase() === "CashIn"){
                    filtering = await this.transaction.credited(credited)
                }

                if(String(transaction).toLocaleLowerCase() === "CashOut"){
                    filtering = await this.transaction.credited(debited)
                }
                else {
                    filtering = await this.transaction.filterCredited(data)
                }
            }

            return filtering;
        } else {

            const transactionCashIn = await this.transaction.credited(credited)

            const transactionCashOut = await this.transaction.credited(debited)

            const data = {
                CashIn: transactionCashIn,
                CashOut: transactionCashOut
            }

            return data
        }    

    }
}

export { FilteringService }
