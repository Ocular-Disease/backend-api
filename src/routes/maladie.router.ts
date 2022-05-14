import { Router } from 'express';
import adminController from '../controller/admin.controller';
import maladieController from '../controller/maladie.controller';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { Role } from '../types/role.enum';
import { ensureNotLoggedIn } from "../middleware/ensureNotLoggedIn.middleware";

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
    }
}

export default new MaladieRouter();
