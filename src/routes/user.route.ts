import { Router } from "express";
import userController from "../controller/user.controller";
import { decodeUser } from "../middleware/decodeuser.middleware";
import jwtService from "../service/jwt.service";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/", userController.greet);
        this.router.get("/me", decodeUser, userController.user);
    }
}

export default new UserRouter();