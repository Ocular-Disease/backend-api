declare namespace Express {
    export interface Request {
        userId?: string;
        session: {
            access_token?: string;
        }
    }
}