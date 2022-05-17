import { Router } from 'express';
import secretaireController from '../controller/secretaire.controller';
import { decodeUser } from '../middleware/decodeuser.middleware';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { Role } from '../types/role.enum';

class SecretaireRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes() {
		this.router.get(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.MEDECIN),
			secretaireController.getAll
		);
		this.router.get(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.MEDECIN),
			secretaireController.getById
		);
		this.router.post(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			secretaireController.create
		);
		this.router.delete(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			secretaireController.delete
		);
		this.router.put(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.MEDECIN),
			secretaireController.update
		);
	}
}

export default new SecretaireRouter();
