import { Router } from "express";
import userController from "../controller/user.controller";
import { decodeUser } from "../middleware/decodeuser.middleware";
import { ensureAccessLevel } from "../middleware/ensureAccessLevel";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.middleware";
import jwtService from "../service/jwt.service";
import { Role } from "../types/role.enum";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get("/", userController.greet);
        this.router.get("/me",
            decodeUser,
            ensureAuthenticated,
            ensureAccessLevel(Role.ADMIN),
            userController.user
        );
    }
}

export default new UserRouter();