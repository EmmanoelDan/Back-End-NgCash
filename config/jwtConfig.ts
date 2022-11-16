import dotenv from "dotenv";
dotenv.config();

export default {
    expirenTime: '24h',
    secretKey: process.env.JWT_KEY
}