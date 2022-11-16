import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";

export class AuthLogin {
    // async validateLogin(request: Request, response: Response, next: NextFunction){
    //     const token: any = request.headers.authorization?.split('')[1]
    //     const decode: any= jwt.verify(token, process.env.JWT_KEY)
    //     request.user = decode;
    //     next();
    // }
}