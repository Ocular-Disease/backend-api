import {Request, Response, NextFunction} from 'express';
import { UnauthorizedError } from '../error/UnauthorizedError.error';

export const ensureRequestedResourceOwnership = (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id) {
        if (req.params.id !== req.currentUser?.userId) {
            throw new UnauthorizedError('You are not authorized to access this resource');
        } else {
            next();
        }
    } else {
        next();
    }
}