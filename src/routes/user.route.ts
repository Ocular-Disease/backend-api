import { Router } from "express";
import userController from "../controller/user.controller";
import { decodeUser } from "../middleware/decodeuser.middleware";
import { ensureAccessLevel } from "../middleware/ensureAccessLevel";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.middleware";
import { Role } from "../types/role.enum";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get("/", userController.users);
        this.router.post("/", userController.create);
        this.router.get("/hello", userController.greet);
        this.router.get("/me",
            decodeUser,
            ensureAuthenticated,
            ensureAccessLevel(Role.PATIENT),
            userController.user
        );
    }
}

export default new UserRouter();