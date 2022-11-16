import { prismaClient } from "../database/prismaClient";

class UserBalanceService {
    async execute(user_id: string){
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }, 
            select: {
                id: true,
                username: true,
                account: {
                    select: {
                        id: true,
                        balance: true
                    }
                }
            }
        })

        return user
    }
}

export {UserBalanceService}