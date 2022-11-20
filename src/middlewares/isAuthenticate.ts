import jwt from "jsonwebtoken";
import jwtConfig from "../../config/jwtConfig"
import { NextFunction, Request, Response } from "express"

/***
 *  Middlaware JWT authentication:
 *  Middlware authenticates the user by generating a token on access. That later, used on other access routes.
 */

interface Payload {
    id: string
}

export function isAuthenticate (
    request: Request, response: Response, next: NextFunction
){
    try {
        const token = request.headers.authorization.split(' ')[1]
        const { id } = jwt.verify(token, jwtConfig.secretKey) as unknown as Payload;
        request.user = {
            id: id
        }

        return next()
    } catch (error) {
        return response.status(401).end()
    }
}