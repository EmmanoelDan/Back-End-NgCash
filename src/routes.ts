import { Request, Response, Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router();

const createUser = new CreateUserController();

router.get('/v1', (req: Request, res: Response)=> {
    res.status(200).json({
        Hello: "World"
    })
});

router.post("/v1/user", createUser.handle)

export { router }

