import { Router } from "express";
import userController from "../controller/user.controller";

class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public routes() {
        this.router.get("/", userController.greet);
    }
}

export default new UserRouter();