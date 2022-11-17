import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import cors from "cors";

const port = 3000;

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction)=> {
    if (err instanceof Error){
        return response.status(400).json({
            error: err.message
        })

        
    }
    return response.status(500).json({
        status: 'error',
        message: "Internal Server Error."
    })
})

app.listen(port, () => {
    console.log(`Server is Running, on port: ${port}`)
});
