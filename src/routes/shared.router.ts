import express from "express";

class SharedRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.config();
    }
    config() {
        this.router.get("/logout", (req, res) => {
            req.session.access_token = undefined;


            res.status(200).json({
                message: "Logged out"
            });
        });
    }
}

export default new SharedRouter();