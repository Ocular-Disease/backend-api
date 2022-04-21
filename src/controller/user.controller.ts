import { Request, Response } from 'express';
import jwtService from '../service/jwt.service';
import moment from 'moment'
import { Role } from '../types/role.enum';

class UserController {
    public async greet(req: Request, res: Response) {
        req.session.access_token = jwtService.sign({ userId: 'belkamelmohamed@gmail.com', role: Role.MEDECIN });
        req.sessionOptions.expires = moment().add(1, 'days').toDate();

        res.status(200).json({ message: 'Hello' });

    }

    public async user(req: Request, res: Response) {
        res.status(200).json(req.currentUser);
    }
}

export default new UserController();