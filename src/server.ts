import express from "express";
const port = 3000;

const server = express();

server.listen(port, () => {
    console.log(`Server is Running, on port: ${port}`)
});
