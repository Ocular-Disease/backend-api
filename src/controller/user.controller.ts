import { Request, Response } from 'express';

class UserController {
    public async greet(req: Request, res: Response) {
        res.status(200).json({
            message: 'Hello World'
        });
    }
}

export default new UserController();