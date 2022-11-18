import { prismaClient } from "../../database/prismaClient";
import { IUserRepository } from "../../repositories/IUserRepositories";

interface IBalanceService {
    id: String
}

export class BalanceService {
    constructor(private userRepository: IUserRepository){
    }
    async execute({id}: IBalanceService){

        const user = await prismaClient.user.findFirst({
            where: {
                id: String (id)
            }
        })

        const account = await prismaClient.account.findFirst({
            where: {
                id: user.accountId
            }
        })

        return account
    }
}