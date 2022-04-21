import { Request, Response } from 'express';
import jwtService from '../service/jwt.service';
import moment from 'moment'
import { Role } from '../types/role.enum';
import userService from '../service/user.service';
import { User } from '../model/user';
import { validate } from 'class-validator';
import { ValidationError } from '../error/ValidationError';

class UserController {
    public async greet(req: Request, res: Response) {
        req.session.access_token = jwtService.sign({ userId: 'belkamelmohamed@gmail.com', role: Role.ADMIN });
        req.sessionOptions.expires = moment().add(1, 'days').toDate();

        res.status(200).json({ message: 'Hello' });

    }

    public async user(req: Request, res: Response) {
        res.status(200).json(req.currentUser);
    }

    public async users(req: Request, res: Response) {
        res.status(200).json(await userService.getAll());
    }

    public async create(req: Request, res: Response) {
        const user = new User(req.body);

        const errors = await validate(user);

        if (errors.length > 0) {
            throw new ValidationError(errors);
        }

        res.status(200).json(await userService.create(user));
    }
}

export default new UserController();