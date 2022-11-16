import { Request, Response } from "express";
import { TransactionsUsersService } from "../services/TransactionsUsersService";


class TransactionsUsersController {
    async handle(request: Request, response: Response){
        const {debitedAccountId, creditedAccountId, value} = request.body;

        const transactionUserService = new TransactionsUsersService();

        const cash = await transactionUserService.execute({
            debitedAccountId, creditedAccountId, value
        })

        return response.json(cash);

    }
}

export {TransactionsUsersController}