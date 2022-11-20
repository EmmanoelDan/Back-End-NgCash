import { Router } from "express";
import { createUserFactory } from "../services/createUser/CreateUserFactory";
import { userAuthFactory } from "../services/userAuth/UserAuthFactory";

const user = Router();

user.post("/", (request, response) => {
    createUserFactory().handle(request, response)
})
user.post("/sign", (request, response) => {
    userAuthFactory().handle(request, response)
})

export {user}
