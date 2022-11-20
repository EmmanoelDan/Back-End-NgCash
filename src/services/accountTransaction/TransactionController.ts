import { Request, Response } from "express";
import { TransactionService } from "./TransactionService";

export class TransactionController {
    constructor(private transactionService: TransactionService){
    }

    async handle(request: Request, response: Response){
        try {
            const { id } = request.user;
        
            const {creditedAccountId, username, value} = request.body;

            const transaction = await this.transactionService.execute({id, creditedAccountId, username, value})

            return response.status(200).json({sucess: true, data: transaction})
        } catch (error) {
            return response.json(error.message)
        }
        

    }

}