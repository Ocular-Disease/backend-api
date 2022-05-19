import { Response, Request, NextFunction } from 'express';
import moment from 'moment';
import { config } from '../config/env.config';
import { BadRequestException } from '../error/BadRequestException.error';
import jwtService from '../service/jwt.service';
import medecinService from '../service/medecin.service';
import passwordService from '../service/password.service';
import secretaireService from '../service/secretaire.service';
import tokenService from '../service/token.service';
import { Role } from '../types/role.enum';

class SecretaireController {
	public async getAll(req: Request, res: Response) {
		res.status(200).json(await secretaireService.getAll());
	}

	public async getById(req: Request, res: Response) {
		const secretaireId = req.params.id;

		res.status(200).json(await secretaireService.getById(secretaireId));
	}

	public async create(req: Request, res: Response) {
		const secretaire = req.body;

		res.status(200).json(await secretaireService.create({ ...secretaire, password: await passwordService.hashPassword(secretaire.password) }));
	}

	public async delete(req: Request, res: Response) {
		const secretaireId = req.params.id;

		await secretaireService.delete(secretaireId);

		res.status(200).json();
	}

	public async update(req: Request, res: Response) {
		const secretaireId = req.params.id;
		const secretaire = req.body;

		res.status(200).json(await secretaireService.update(secretaireId, { ...secretaire, password: await passwordService.hashPassword(secretaire.password) }));
	}

	public async login(req: Request, res: Response) {
		const { login, password } = req.body;

		const user = await secretaireService.getByEmail(login);

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
			role: Role.SECRETAIRE,
		});

		req.sessionOptions.expires = moment().add(1, 'day').toDate();
		const refreshToken = jwtService.signRefreshToken({
			userId: user.id,
			role: Role.SECRETAIRE,
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

export default new SecretaireController();
