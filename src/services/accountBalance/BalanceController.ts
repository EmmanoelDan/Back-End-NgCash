import { Request, Response } from "express";
import { BalanceService } from "./BalanceService";

export class BalanceController {
    constructor(private balanceService: BalanceService){
    }

    async handle(request: Request, response: Response){
        const { id } = request.user;

        const balance = await this.balanceService.execute({id})

        return response.json(balance)

    }

}