import { Router } from "express";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { filteringFactory } from "../services/accountTransaction/fiterTransaction/FilteringFactory";
import { transactionFactory } from "../services/accountTransaction/TransactionFactory";

/**
 * Route Transactions
 */


const transaction = Router();

/**
 * Method: POST /transactions
 * Create Transactions
 * 
 * Method: GET /Transactions/index
 * Getting all transaction
 */

transaction.post("/", isAuthenticate, (request, response) => {
    transactionFactory().handle(request, response)
})
transaction.get("/index", isAuthenticate, (request, response) => {
    filteringFactory().handle(request, response)
})

export { transaction }