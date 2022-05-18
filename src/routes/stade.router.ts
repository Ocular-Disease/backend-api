import { Router } from 'express';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { Role } from '../types/role.enum';

import stadeController from '../controller/stade.controller';

class StadeRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes() {
		this.router.get(
			'/maladie/:maladieId',
			ensureAuthenticated,
			ensureAccessLevel(Role.MEDECIN),
			stadeController.getStadeByMaladie
		);

		this.router.get(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.MEDECIN),
			stadeController.getAll
		);

		this.router.post(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.MEDECIN),
			stadeController.create
		);

		this.router.delete(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.MEDECIN),
			stadeController.delete
		);


		this.router.put(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.MEDECIN),
			stadeController.update
		);
	}
}

export default new StadeRouter();
