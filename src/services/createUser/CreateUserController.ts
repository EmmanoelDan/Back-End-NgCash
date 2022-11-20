import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

class CreateUserController {
    constructor(private createUser: CreateUserService){}

    async handle(request: Request, response: Response){

        try {
            const {username, password} = request.body;

            const user = await this.createUser.execute({username, password})
            
            return response.status(200).json({sucess: true, data: user})
            
        } catch (error) {
            return response.json({sucess: false, error: error.message})
        }
        
    }   
}

export {CreateUserController}