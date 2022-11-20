import { Router } from "express";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { filteringFactory } from "../services/accountTransaction/fiterTransaction/FilteringFactory";
import { transactionFactory } from "../services/accountTransaction/TransactionFactory";

const transaction = Router();

transaction.post("/", isAuthenticate, (request, response) => {
    transactionFactory().handle(request, response)
})
transaction.get("/index", isAuthenticate, (request, response) => {
    filteringFactory().handle(request, response)
})

export { transaction }