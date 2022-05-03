import { Router } from 'express';
import adminController from '../controller/admin.controller';
import { decodeUser } from '../middleware/decodeuser.middleware';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { Role } from '../types/role.enum';

class AdminRouter {
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
			adminController.allAdmins
		);
		this.router.get(
			'/me/details',
			decodeUser,
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.details
		);
		this.router.post(
			'/',
			decodeUser,
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.create
		);
		this.router.post('/login', adminController.login);
		this.router.get('/logout', adminController.logout);
		this.router.get(
			'/me',
			decodeUser,
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.currentAdmin
		);
		this.router.get(
			'/:id',
			decodeUser,
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.adminById
		);
	}
}

export default new AdminRouter();
