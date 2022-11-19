import { app } from "./app";

const port = 3000;

app.listen(port, () => {
    console.log(`Server is Running, on port: ${process.env.SERVER_PORT}`)
});