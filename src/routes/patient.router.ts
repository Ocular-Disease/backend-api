import { Router } from 'express';
import patientController from '../controller/patient.controller';
import { decodeUser } from '../middleware/decodeuser.middleware';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { Role } from '../types/role.enum';

class PatientRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes() {
		this.router.get(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.SECRETAIRE),
			patientController.getAll
		);
		this.router.get(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.SECRETAIRE),
			patientController.getById
		);
		this.router.post(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.SECRETAIRE),
			patientController.create
		);
		
		this.router.delete(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.SECRETAIRE),
			patientController.delete
		);
		this.router.put(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.SECRETAIRE),
			patientController.update
		);
	}
}

export default new PatientRouter();
