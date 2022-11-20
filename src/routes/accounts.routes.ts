import { Router } from "express";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { balanceFactory } from "../services/accountBalance/BalanceFactory";

const account = Router();

account.get("/", isAuthenticate, (request, response) => {
    balanceFactory().handle(request, response)
})

export {account}