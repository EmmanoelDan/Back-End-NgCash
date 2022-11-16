import { Router } from "express";
import { AuthUserController } from "./controllers/AuthUserController";
//import { CreateAccountController } from "./controllers/CreateAccountController";
import { CreateUserController } from "./controllers/CreateUserController";
import { UserBalanceController } from "./controllers/UserBalanceController";
import { isAuthenticate } from "./middlewares/isAuthenticate";

const router = Router();

router.post("/v1/users", new CreateUserController().handle)
router.post("/v1/sign", new AuthUserController().handle)
router.get("/v1/profile", isAuthenticate, new UserBalanceController().handle)


export { router }

