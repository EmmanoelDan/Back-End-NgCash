import { Request, Response, Router } from "express";
import {body} from "express-validator"
//import { CreateAccountController } from "./controllers/CreateAccountController";
import { CreateUserController } from "./controllers/User/CreateUserController";

const router = Router();

const createUser = new CreateUserController();

router.post("/v1/user", [
    body("password").isLength({min: 8})
], createUser.handle)

export { router }

