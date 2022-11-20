import { Router } from "express";
import { createUserFactory } from "../services/createUser/CreateUserFactory";
import { userAuthFactory } from "../services/userAuth/UserAuthFactory";

/**
 * Route User
 */


const user = Router();

/**
 * Method: POST /users
 * Create new Uses
 * 
 * Method: GET /users/sign
 * Create login users
 */

user.post("/", (request, response) => {
    createUserFactory().handle(request, response)
})
user.post("/sign", (request, response) => {
    userAuthFactory().handle(request, response)
})

export {user}
