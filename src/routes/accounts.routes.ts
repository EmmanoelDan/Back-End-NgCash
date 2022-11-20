import { Router } from "express";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { balanceFactory } from "../services/accountBalance/BalanceFactory";

/**
 * Routa de Account
 */

const account = Router();

/**
 * Method: GET 
 * Search the balances of each bank account
 */

account.get("/", isAuthenticate, (request, response) => {
    balanceFactory().handle(request, response)
})

export {account}