import { Request, Response } from "express";
import { UserAuthService } from "./UserAuthService";

class UserAuthController {
    constructor(private serverAuth: UserAuthService){}

    async handle(request: Request, response: Response){
        const {username, password} = request.body;

        const user = await this.serverAuth.execute({username, password})
        
        return response.json(user)
    }   
}

export {UserAuthController}