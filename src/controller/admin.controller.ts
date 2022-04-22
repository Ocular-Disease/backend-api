import { Request, Response } from 'express';
import userService from '../service/admin.service';
import { User } from '../model/user';
import { validate } from 'class-validator';
import { ValidationError } from '../error/ValidationError';

class AdminController {

    public async currentAdmin(req: Request, res: Response) {
        res.status(200).json(req.currentUser);
    }

    public async allAdmins(req: Request, res: Response) {
        res.status(200).json(await userService.getAll());
    }

    public async create(req: Request, res: Response) {


        throw new Error('Not implemented');
    }

    public async adminById(req: Request, res: Response) {
        const userId = req.params.id;

        res.status(200).json(await userService.getById(userId));
    }
}

export default new AdminController();