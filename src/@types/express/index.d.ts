// The Global interface user token

declare namespace Express{
    export interface Request{
        user: {
            id: String
        }
    }
}