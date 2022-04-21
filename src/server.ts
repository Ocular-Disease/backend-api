import cookieSession from "cookie-session";
import cors from "cors";
import express, { Application } from "express"
import morgan from "morgan";
import { config } from "./config/env.config";
import { securityMiddleware } from "./config/security.config";
import { errorHandler } from "./error/errorhandler.handler";
import { NotFoundException } from "./error/NotFoundException.error";
import userRoute from "./routes/user.route";

export class App {

    private _app: Application;

    constructor() {
        this._app = express();

        /**
         * Map Middleware
         */

        this.mapMiddleware();

        /**
         * Map Routes
         */

        this.mapRoutes();


        /**
         * Error Handler
         */

        this._app.use(errorHandler);


    }

    private mapMiddleware() {
        this._app.use(
            config.NODE_ENV ? morgan('dev') : morgan('combined')
        );
        this._app.use(securityMiddleware);
        this._app.use(cors({
            origin: config.CORS_ORIGIN,
        }));
        this._app.use(
            cookieSession({
                name: "access_token",
                domain: config.COOKIE_DOMAIN,
                signed: false,
                httpOnly: true,
                secure: config.NODE_ENV === 'production',
            })
        )
        this._app.use(
            express.json({
                limit: '10mb',
            }),
        );
    }

    private mapRoutes() {
        this._app.use('/api/users', userRoute.router);
        this._app.all('*', (req, res) => {
            throw new NotFoundException("Route not found");
        });
    }

    public listen(callback: () => void) {
        this._app.listen(config.port, callback);
    }
}