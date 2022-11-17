import { Request, Response } from "express";
import z, { ZodError } from "zod"
import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
    async handle(request: Request, response: Response){
        try {
            const {username, password} = request.body;

            const PASSWORD_VALIDATION_REGEX = /((?=.*\d))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    
            const createUserSchema = z.object({
                username: z.string({
                    required_error: "Username is required"
                }).min(3),
                password: z.string({
                    required_error: "Password is required"
                }).regex(PASSWORD_VALIDATION_REGEX).min(8)
            });
    
            const credentials = createUserSchema.safeParse(request.body);
            if(!credentials.success){
                console.log(credentials[0])
                return response.json(credentials)
            }
    
            const createUserService = new CreateUserService();
            const user = await createUserService.execute({
                username,
                password
            })
    
            return response.json(user) 
        } catch (error) {
            return response.json({sucess: false, error: error.ZodError})
        }
        
    }
}

export { CreateUserController}