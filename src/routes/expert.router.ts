import express from 'express';
import expertController from '../controller/expert.controller';
import { ensureAccessLevel } from '../middleware/ensureAccessLevel';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware';
import { Role } from '../types/role.enum';

class ExpertRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }
    private routes() {
        this.router.get(
            '/',
            ensureAuthenticated,
            ensureAccessLevel(Role.ADMIN),
            expertController.allExperts
        );

        this.router.get(
            '/:id',
            ensureAuthenticated,
            ensureAccessLevel(Role.ADMIN),
            expertController.getExpertById
        );

        this.router.post(
            '/',
            ensureAuthenticated,
            ensureAccessLevel(Role.ADMIN),
            expertController.createExpert
        );

        this.router.put(
            '/:id',
            ensureAuthenticated,
            ensureAccessLevel(Role.ADMIN),
            expertController.updateExpert
        );

        this.router.delete(
            '/:id',
            ensureAuthenticated,
            ensureAccessLevel(Role.ADMIN),
            expertController.deleteExpert
        );
    }

}

export default new ExpertRouter();