import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "./UnauthorizedError.error";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof UnauthorizedError) {
        res.status(err.statusCode).json(err.serializeErrors());
    } else {
        res.status(500).json({
            errors: [{
                message: "Something went wrong"
            }]
        });
    }
}