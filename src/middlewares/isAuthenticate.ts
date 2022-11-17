import jwt, { verify } from "jsonwebtoken";
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
        const {id} = jwt.verify(token, jwtConfig.secretKey) as unknown as Payload;
        request.user = {
            id: String(id)
        }

        return next()
    } catch (error) {
        return response.status(401).end()
    }
}