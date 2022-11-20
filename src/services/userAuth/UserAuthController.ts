import { Request, Response } from "express";
import { UserAuthService } from "./UserAuthService";

class UserAuthController {
    constructor(private serverAuth: UserAuthService){}

    async handle(request: Request, response: Response){
        try {
            const {username, password} = request.body;

            const user = await this.serverAuth.execute({username, password})
        
            return response.send(200).json({sucess: true, data: user})   
        } catch (error) {
            return response.json({sucess: false, error: error.message})
        }
        
    }   
}

export {UserAuthController}