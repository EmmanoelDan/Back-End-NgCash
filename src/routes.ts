import { Request, Response, Router } from "express";

const router = Router();

router.get('/v1', (req: Request, res: Response)=> {
    res.status(200).json({
        Hello: "World"
    })
});

export { router }

