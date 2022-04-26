import { Router } from 'express';
import medecinController from '../controller/medecin.controller';
import { decodeUser } from '../middleware/decodeuser.middleware';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { Role } from '../types/role.enum';

class MedecinRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes() {
		this.router.get(
			'/',
			decodeUser,
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			medecinController.getAll
		);
		this.router.get(
			'/:id',
			decodeUser,
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			medecinController.getById
		);
		this.router.post(
			'/',
			decodeUser,
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			medecinController.create
		);
		this.router.delete(
			'/:id',
			decodeUser,
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			medecinController.delete
		);
		this.router.put(
			'/:id',
			decodeUser,
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			medecinController.update
		);
	}
}

export default new MedecinRouter();
