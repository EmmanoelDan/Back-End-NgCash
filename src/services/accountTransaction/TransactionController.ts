import { Request, Response } from "express";
import { TransactionService } from "./TransactionService";

export class TransactionController {
    constructor(private transactionService: TransactionService){
    }

    async handle(request: Request, response: Response){
        const { id } = request.user;
        
        const {creditedAccountId, username, value} = request.body;

        const transaction = await this.transactionService.execute({id, creditedAccountId, username, value})

        return response.json(transaction)

    }

}