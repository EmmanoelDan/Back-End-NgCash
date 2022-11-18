import { Router } from "express";
import { isAuthenticate } from "../middlewares/isAuthenticate";
import { balanceFactory } from "../services/accountBalance/BalanceFactory";
import { filteringFactory } from "../services/accountTransaction/fiterTransaction/FilteringFactory";
import { transactionFactory } from "../services/accountTransaction/TransactionFactory";
import { createUserFactory } from "../services/createUser/CreateUserFactory";
import { userAuthFactory } from "../services/userAuth/UserAuthFactory";

const router = Router();

router.post("/v1/users", (request, response) => {
    createUserFactory().handle(request, response)
})
router.post("/v1/sign", (request, response) => {
    userAuthFactory().handle(request, response)
})
router.get("/v1/profile", isAuthenticate, (request, response) => {
    balanceFactory().handle(request, response)
})

router.post("/v1/transactions", isAuthenticate, (request, response) => {
    transactionFactory().handle(request, response)
})
router.post("/v1/transactions/test", isAuthenticate, (request, response) => {
    filteringFactory().handle(request, response)
})

export { router }

