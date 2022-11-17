import { Request, Response } from "express";
import { prismaClient } from "../database/prismaClient";

export class FilterController {
    async execute(request: Request, response: Response){
        const { id } = request.user;

        const {date, transaction} = request.query;

        const user = await prismaClient.user.findFirst({
            where: {
                id: String(id)
            }
        })

        let filterTrasaction;

        if(date || transaction){
            if(date && transaction){
                if(String(transaction).toLocaleLowerCase() === "CashIn"){
                    filterTrasaction = await prismaClient.transaction.findMany({
                        where: {
                            created_at: {
                                gte: String(date)
                            },
                            creditedAccountId: user?.accountId
                        }
                    })
                }

                if(String(transaction).toLocaleLowerCase() === "CashOut"){
                    filterTrasaction = await prismaClient.transaction.findMany({
                        where: {
                            created_at: {
                                gte: String(date)
                            },
                            debitedAccountId: user?.accountId
                        }
                    })
                }
            } else {
                if(String(transaction).toLocaleLowerCase() === "CashIn"){
                    filterTrasaction = await prismaClient.transaction.findMany({
                        where: {
                            creditedAccountId: user?.accountId
                        }
                    })
                }

                if(String(transaction).toLocaleLowerCase() === "CashOut"){
                    filterTrasaction = await prismaClient.transaction.findMany({
                        where: {
                            debitedAccountId: user?.accountId
                        }
                    })
                }
                else {
                    filterTrasaction = await prismaClient.transaction.findMany({
                        where: {
                            created_at: {
                                gte: String(date)
                            }
                        }
                    })
                }
            }

            return filterTrasaction;
        } else {
            const transactionCashIn = await prismaClient.transaction.findMany({
                where: {
                    creditedAccountId: user?.accountId
                }
            })

            const transactionCashOut = await prismaClient.transaction.findMany({
                where: {
                    debitedAccountId: user?.accountId
                }
            })

            const data = {
                CashIn: transactionCashIn,
                CashOut: transactionCashOut
            }

            return response.json(data);
        }
    }
}