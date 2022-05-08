import { Request, Response } from 'express';
import moment from 'moment';
import { BadRequestException } from '../error/BadRequestException.error';
import adminService from '../service/admin.service';
import jwtService from '../service/jwt.service';
import passwordService from '../service/password.service';
import { Role } from '../types/role.enum';

import tokenService from '../service/token.service';

class AdminController {
	public async currentAdmin(req: Request, res: Response) {
		res.status(200).json(req.currentUser);
	}

	public async allAdmins(req: Request, res: Response) {
		res.status(200).json(await adminService.getAll());
	}

	public async getTokens(req: Request, res: Response) {
		res.status(200).json(await tokenService.getTokensByUser(await adminService.getById(req.currentUser?.userId!)));
	}

	public async create(req: Request, res: Response) {
		throw new Error('Not implemented');
	}

	public async adminById(req: Request, res: Response) {
		const userId = req.params.id;

		res.status(200).json(await adminService.getById(userId));
	}

	public async login(req: Request, res: Response) {
		const { login, password } = req.body;

		const user = await adminService.getByEmail(login);

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
			sameSite: 'lax',
		});

		res.status(200).json(user);
	}

	public async logout(req: Request, res: Response) {
		req.session.access_token = undefined;

		res.status(200).json();
	}

	public async details(req: Request, res: Response) {
		const admin = await adminService.getById(req.currentUser?.userId!);

		const adminNoPassword = { ...admin, password: undefined };


		res.status(200).json(adminNoPassword);
	}
}

export default new AdminController();
