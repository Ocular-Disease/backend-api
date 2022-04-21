import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IPayload } from '../types/jwtpayload.interface';

export const decodeUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.session.access_token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as IPayload;
            req.userId = decoded.userId;
        } catch (error) {
            next(error);
        }
    }
    next();
}