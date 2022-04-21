import { Request, Response } from 'express';
import jwtService from '../service/jwt.service';
import moment from 'moment'

class UserController {
    public async greet(req: Request, res: Response) {
        req.session.access_token = jwtService.sign({ userId: 'belkamelmohamed@gmail.com' });
        req.sessionOptions.expires = moment().add(1, 'days').toDate();

        res.status(200).json({ message: 'Hello' });

    }

    public async user(req: Request, res: Response) {
        res.status(200).json(req.userId);
    }
}

export default new UserController();