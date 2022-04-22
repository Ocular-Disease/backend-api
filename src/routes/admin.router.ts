import { Router } from "express";
import adminController from "../controller/admin.controller";
import { decodeUser } from "../middleware/decodeuser.middleware";
import { ensureAccessLevel } from "../middleware/ensureAccessLevel";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.middleware";
import { Role } from "../types/role.enum";

class AdminRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get("/",
            adminController.allAdmins
        );
        this.router.post("/",
            adminController.create
        );
        this.router.get("/me",
            decodeUser,
            ensureAuthenticated,
            ensureAccessLevel(Role.PATIENT),
            adminController.currentAdmin
        );
        this.router.get("/:id",
            decodeUser,
            ensureAuthenticated,
            ensureAccessLevel(Role.PATIENT),
            adminController.adminById
        );
    }
}

export default new AdminRouter();