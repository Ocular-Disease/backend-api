import express from "express";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.middleware";
import adminService from "../service/admin.service";
import medecinService from "../service/medecin.service";
import secretaireService from "../service/secretaire.service";
import { Role } from "../types/role.enum";

class SharedRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.config();
    }
    config() {
        this.router.get("/logout", ensureAuthenticated, (req, res) => {
            req.session.access_token = undefined;

            res.status(200).json({
                message: "Logged out"
            });
        });

        this.router.get('/me', ensureAuthenticated, (req, res) => {
            res.status(200).json(req.currentUser);
        });

        this.router.get('/me/details', ensureAuthenticated, (req, res) => {
            const { userId, role } = req.currentUser!;

            if (role === Role.ADMIN) {
                adminService.getById(userId).then(admin => {
                    res.status(200).json({ ...admin, password: undefined });
                });
            } else if (role === Role.MEDECIN) {
                medecinService.getById(userId).then(medecin => {
                    res.status(200).json({ ...medecin, password: undefined });
                });
            } else if (role === Role.SECRETAIRE) {
                secretaireService.getById(userId).then(secretaire => {
                    res.status(200).json({ ...secretaire, password: undefined });
                });
            } else {
                res.status(400).json({ message: "Invalid role" });
            }
        });
    }
}

export default new SharedRouter();