import jwt from "jsonwebtoken";
import jwtConfig from "../../config/jwtConfig"
import { NextFunction, Request, Response } from "express"

interface Payload {
    id: string
}

export function isAuthenticate (
    request: Request, response: Response, next: NextFunction
){
    try {
        const token = request.headers.authorization.split(' ')[1]
        const {id} = jwt.verify(token, jwtConfig.secretKey) as unknown as Payload;;
        request.user_id = id;

        return next()
    } catch (error) {
        return response.status(401).end()
    }
    
    // const authToken = request.headers.authorization;

    // if(!authToken){
    //     return response.status(401).send();
    // }

    // try {
    //     const [, token] = authToken.split("");
    //     const { id } = verify(
    //         token,
    //         jwtConfig.secretKey
    //     ) as unknown as Payload;

    //     request.user_id= id;

        
    // } catch (error){
    //     
    // }
}