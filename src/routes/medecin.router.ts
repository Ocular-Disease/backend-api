import { Router } from 'express';
import medecinController from '../controller/medecin.controller';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { ensureRequestedResourceOwnership } from '../middleware/ensureRequestedResourceOwnership.middleware';
import { Role } from '../types/role.enum';

class MedecinRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes() {
		this.router.post(
			'/login',
			medecinController.login
		);
		this.router.get(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			medecinController.getAll
		);
		this.router.get(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.MEDECIN),
			ensureRequestedResourceOwnership,
			medecinController.getById
		);
		this.router.post(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			medecinController.create
		);
		this.router.delete(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			medecinController.delete
		);
		this.router.put(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.MEDECIN),
			ensureRequestedResourceOwnership,
			medecinController.update
		);
	}
}

export default new MedecinRouter();
