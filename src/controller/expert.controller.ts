import { Request, Response } from 'express';
import { BadRequestException } from '../error/BadRequestException.error';
import { Expert } from '../model/expert';
import expertService from '../service/expert.service';
import passwordService from '../service/password.service';

class ExpertController {
    public async allExperts(req: Request, res: Response) {
        res.status(200).json((await expertService.getAllExperts()).map((expert) => ({ ...expert, password: undefined })));
    }

    public async getExpertById(req: Request, res: Response) {
        const expertId = req.params.id;

        res.status(200).json({ ...await expertService.getExpertById(expertId), password: undefined });

    }

    public async createExpert(req: Request, res: Response) {
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName || !lastName) {
            throw new BadRequestException('Missing required fields');
        }

        if (await expertService.getExpertByEmail(email)) {
            throw new BadRequestException('Email already exists');
        }

        const expert = new Expert();

        expert.email = email;
        expert.password = await passwordService.hashPassword(password);
        expert.firstName = firstName;
        expert.lastName = lastName;

        const newExpert = await expertService.createExpert(expert);

        res.status(200).json({ ...newExpert, password: undefined });

    }

    public async updateExpert(req: Request, res: Response) {
        const expertId = req.params.id;
        const { email, password, firstName, lastName } = req.body;

        if (!email || !password || !firstName || !lastName) {
            throw new BadRequestException('Missing required fields');
        }

        const expert = await expertService.getExpertById(expertId);

        if (!expert) {
            throw new BadRequestException('Expert not found');
        }

        await expertService.updateExpert(expertId, req.body);

        res.status(200).json({ ...await expertService.getExpertById(expertId), password: undefined });

    }

    public async deleteExpert(req: Request, res: Response) {
        const expertId = req.params.id;

        const expert = await expertService.getExpertById(expertId);

        if (!expert) {
            throw new BadRequestException('Expert not found');
        }

        await expertService.deleteExpert(expertId);

        res.status(200).json({ ...await expertService.getExpertById(expertId), password: undefined });

    }

}

export default new ExpertController();