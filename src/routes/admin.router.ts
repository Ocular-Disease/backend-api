import { Router } from 'express';
import adminController from '../controller/admin.controller';
import { decodeUser } from '../middleware/decodeuser.middleware';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { Role } from '../types/role.enum';
import {ensureNotLoggedIn} from "../middleware/ensureNotLoggedIn.middleware";

class AdminRouter {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes() {
		this.router.get(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.allAdmins
		);
		this.router.get(
			'/me/details',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.details
		);
		this.router.post(
			'/',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.create
		);
		this.router.post('/login', ensureNotLoggedIn, adminController.login);
		this.router.get('/tokens', ensureAuthenticated, ensureAccessLevel(Role.ADMIN), adminController.getTokens);
		this.router.get('/logout', adminController.logout);
		this.router.get(
			'/me',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.currentAdmin
		);
		this.router.get(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			adminController.adminById
		);
	}
}

export default new AdminRouter();
