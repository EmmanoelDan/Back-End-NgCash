import { Router } from "express";
import { AuthUserController } from "./controllers/AuthUserController";
//import { CreateAccountController } from "./controllers/CreateAccountController";
import { CreateUserController } from "./controllers/CreateUserController";
import { FilterController } from "./controllers/FilterController";
//import { testController } from "./controllers/AmountController";
import { TransactionsUsersController } from "./controllers/TransactionUsersController";
import { UserBalanceController } from "./controllers/UserBalanceController";
import { isAuthenticate } from "./middlewares/isAuthenticate";

const router = Router();

router.post("/v1/users", new CreateUserController().handle)
router.post("/v1/sign", new AuthUserController().handle)
router.get("/v1/profile", isAuthenticate, new UserBalanceController().handle)

router.post("/v1/transactions", isAuthenticate, new TransactionsUsersController().handle)
router.post("/v1/transactions/test", isAuthenticate, new FilterController().execute)

export { router }

