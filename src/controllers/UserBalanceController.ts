import { Request, Response } from "express";
import { UserBalanceService } from "../services/UserBalanceService";



class UserBalanceController {
    async handle(request: Request, response: Response){
        const {user_id} = request.body;

        const userBalance = new UserBalanceService();
        const user = await userBalance.execute(user_id);
        
        return response.json(user)
    }
}

export {UserBalanceController}