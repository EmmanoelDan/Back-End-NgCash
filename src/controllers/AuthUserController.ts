import { Request, Response } from "express";
import { AuthUserService } from "../services/AuthUserService";


class AuthUserController {
    async handle(request: Request, response: Response){
        const {username, password} = request.body;

        const authUserService = new AuthUserService();

        const auth = await authUserService.execute({username, password})
        return response.json(auth);
    }
}

export {AuthUserController}