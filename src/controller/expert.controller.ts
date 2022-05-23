import { Request, Response } from 'express';
import moment from 'moment';
import { config } from '../config/env.config';
import { BadRequestException } from '../error/BadRequestException.error';
import { Expert } from '../model/expert';
import expertService from '../service/expert.service';
import jwtService from '../service/jwt.service';
import passwordService from '../service/password.service';
import tokenService from '../service/token.service';
import { Role } from '../types/role.enum';

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

    public async login(req: Request, res: Response) {
        const { login, password } = req.body;

        const user = await expertService.getExpertByEmail(login);

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }

        const isPasswordValid = await passwordService.comparePassword(
            password,
            user.password
        );

        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        req.session.access_token = jwtService.sign({
            userId: user.id,
            role: Role.ADMIN,
        });

        req.sessionOptions.expires = moment().add(1, 'day').toDate();
        const refreshToken = jwtService.signRefreshToken({
            userId: user.id,
            role: Role.ADMIN,
        });

        const refresh_token = await tokenService.createToken(user, refreshToken);

        res.cookie('refresh_token', refresh_token.id, {
            expires: moment().add(90, 'day').toDate(),
            httpOnly: true,
            sameSite: 'none',
            secure: config.NODE_ENV === 'production',
        });

        res.status(200).json({ ...user, password: undefined });
    }
}

export default new ExpertController();