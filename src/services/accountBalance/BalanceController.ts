import { Request, Response } from "express";
import { BalanceService } from "./BalanceService";

export class BalanceController {
    constructor(private balanceService: BalanceService){
    }

    async handle(request: Request, response: Response){

        try {
            const { id } = request.user;

            const balance = await this.balanceService.execute({id})

            return response.json({sucess: true, data: balance})

        } catch (error) {
            return response.json({sucess: true, error: error.message})
        }
        
    }

}