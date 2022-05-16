import { Response, Request, NextFunction } from 'express';
import moment from 'moment';
import { BadRequestException } from '../error/BadRequestException.error';
import jwtService from '../service/jwt.service';
import medecinService from '../service/medecin.service';
import passwordService from '../service/password.service';
import tokenService from '../service/token.service';
import { Role } from '../types/role.enum';

class MedecinController {
	public async getAll(req: Request, res: Response) {
		res.status(200).json(await medecinService.getAll());
	}

	public async getById(req: Request, res: Response) {
		const medecinId = req.params.id;

		res.status(200).json(await medecinService.getById(medecinId));
	}

	public async create(req: Request, res: Response) {
		const medecin = req.body;

		res.status(200).json(await medecinService.create({ ...medecin, password: await passwordService.hashPassword(medecin.password) }));
	}

	public async delete(req: Request, res: Response) {
		const medecinId = req.params.id;

		await medecinService.delete(medecinId);

		res.status(200).json();
	}

	public async update(req: Request, res: Response) {
		const medecinId = req.params.id;
		const medecin = req.body;

		res.status(200).json(await medecinService.update(medecinId, medecin));
	}

	public async login(req: Request, res: Response) {
		const { login, password } = req.body;

		const user = await medecinService.getByEmail(login);

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
			role: Role.MEDECIN,
		});

		req.sessionOptions.expires = moment().add(1, 'day').toDate();
		const refreshToken = jwtService.signRefreshToken({
			userId: user.id,
			role: Role.MEDECIN,
		});

		const refresh_token = await tokenService.createToken(user, refreshToken);

		res.cookie('refresh_token', refresh_token.id, {
			expires: moment().add(90, 'day').toDate(),
			httpOnly: true,
			sameSite: 'none',
		});

		res.status(200).json(user);
	}
}

export default new MedecinController();
