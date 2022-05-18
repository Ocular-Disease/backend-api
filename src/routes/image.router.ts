import { Router } from "express";
import imageController from "../controller/image.controller";
import { ensureAccessLevel } from "../middleware/ensureAccessLevel";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.middleware";
import { Role } from "../types/role.enum";

export class ImageRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post(
            "/add",
            ensureAuthenticated,
            ensureAccessLevel(Role.MEDECIN),
            imageController.addImage
        );

        this.router.get(
            '/preview/:stadeId',
            ensureAuthenticated,
            ensureAccessLevel(Role.MEDECIN),
            imageController.getPreview
        );

        this.router.get(
            "/stades/:stadeId",
            ensureAuthenticated,
            ensureAccessLevel(Role.MEDECIN),
            imageController.getImagesByStade
        );

        this.router.delete(
            "/:id",
            ensureAuthenticated,
            ensureAccessLevel(Role.MEDECIN),
            imageController.deleteImage
        );

        this.router.put(
            '/:id',
            ensureAuthenticated,
            ensureAccessLevel(Role.ADMIN),
            imageController.update
        );
    }
}

export default new ImageRouter();