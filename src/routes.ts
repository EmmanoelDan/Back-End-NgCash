import { Request, Response, Router } from "express";
import { CreateAccountController } from "./controllers/CreateAccontController";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUser = new CreateUserController();
const createAccount = new CreateAccountController();

router.post("/v1/user", createUser.handle)
router.post("/v1/account", createAccount.handle)

export { router }

