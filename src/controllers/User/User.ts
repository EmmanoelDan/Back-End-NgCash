import {z} from "zod";

const PASSWORD_VALIDATION_REGEX = /((?=.*\d))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

const createUserSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }).min(3),
    password: z.string({
        required_error: "Password is required"
    }).regex(PASSWORD_VALIDATION_REGEX).min(8)
});

export {createUserSchema}