import { verify } from "jsonwebtoken";
import jwtConfig from "../config/jwt"
import { NextFunction, Request, Response } from "express"


interface Payload {
    id: string
}

export function isAuthenticate (
    request: Request, response: Response, next: NextFunction
){
    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).send();
    }

    try {
        const [, token] = authToken.split("");
        const { id } = verify(
            token,
            jwtConfig.secretKey
        ) as unknown as Payload;

        request.id = id;

        return next()
    } catch (error){
        return response.status(401).end()
    }
}