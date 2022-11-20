import { Router } from "express";
import { account } from "./accounts.routes";
import { transaction } from "./transactions.routes";
import { user } from "./users.routes";

const router = Router();

router.use("/users", user)
router.use("/accounts", account)
router.use("/transactions", transaction)

export { router }

