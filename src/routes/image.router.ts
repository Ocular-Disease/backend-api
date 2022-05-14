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
            ensureAccessLevel(Role.ADMIN),
            imageController.addImage
        );
    }
}

export default new ImageRouter();