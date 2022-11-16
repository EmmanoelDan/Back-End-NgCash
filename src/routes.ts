import { Request, Response, Router } from "express";
import {body} from "express-validator"
//import { CreateAccountController } from "./controllers/CreateAccountController";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUser = new CreateUserController();
//const createAccount = new CreateAccountController();

router.post("/v1/user", [
    body("password").isLength({min: 8})
], createUser.handle)
//router.post("/v1/account", createAccount.handle)

export { router }

