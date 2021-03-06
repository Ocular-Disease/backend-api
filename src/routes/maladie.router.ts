import { Router } from 'express';
import maladieController from '../controller/maladie.controller';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { Role } from '../types/role.enum';

class MaladieRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post(
            '/',
            ensureAuthenticated,
            ensureAccessLevel(Role.ADMIN),
            maladieController.create
        );

        this.router.get(
            '/',
            ensureAuthenticated,
            ensureAccessLevel(Role.MEDECIN),
            maladieController.getAll
        );

        this.router.get(
            '/:id',
            ensureAuthenticated,
            ensureAccessLevel(Role.MEDECIN),
            maladieController.getById
        );

        this.router.delete(
            '/:id',
            ensureAuthenticated,
            ensureAccessLevel(Role.ADMIN),
            maladieController.delete
        );

        this.router.put(
			'/:id',
			ensureAuthenticated,
			ensureAccessLevel(Role.ADMIN),
			maladieController.update
		);
    }
}

export default new MaladieRouter();
