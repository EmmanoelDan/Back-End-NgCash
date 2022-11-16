import { prismaClient } from "../database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import "../../config/jwtConfig";
import jwtConfig from "../../config/jwtConfig"
import { AuthUserInterface } from "../interfaces/AuthUserInterface";

class AuthUserService {
    async execute({ username, password }: AuthUserInterface) {
        const user = await prismaClient.user.findFirst({
            where: {
                username
            }
        })

        if (!user) {
            throw new Error("User/Password incorrect")
        };
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User/Password incorrect")
        }

        const token = sign({ id: user.id, username: user.username }, jwtConfig.secretKey, { expiresIn: jwtConfig.expirenTime });
        return { id: user.id, username: user.username, token };
    }
};


export { AuthUserService };