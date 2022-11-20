import { Request, Response } from "express";
import { UserAuthService } from "./UserAuthService";

class UserAuthController {
    constructor(private serverAuth: UserAuthService){}

    async handle(request: Request, response: Response){
        try {
            const {username, password} = request.body;

            const user = await this.serverAuth.execute({username, password})
        
            return response.json({sucess: true, data: user})   
        } catch (error) {
            return response.status(400).json({sucess: false, error: error.message, status: error.status})
        }
        
    }   
}

export {UserAuthController}