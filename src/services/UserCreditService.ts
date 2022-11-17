import { prismaClient } from "../database/prismaClient"

interface IAccountRequest {
    creditedAccount: String
}

class UseCreditService {
    async execute({creditedAccount}: IAccountRequest){
        const userCredited= await prismaClient.user.findFirst({
            where: {
                accountId: String (creditedAccount)
            }, select: {
                id: true,
                username: true,
                accountId: true
            }
        })

        return userCredited;
    }
}

export {UseCreditService}