import { Request, Response, Router } from "express";
import { AuthUserController } from "./controllers/AuthUserController";
//import { CreateAccountController } from "./controllers/CreateAccountController";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUser = new CreateUserController();

router.post("/v1/user", createUser.handle)
router.post("/v1/user/session", new AuthUserController().handle)

export { router }

