import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { securityMiddleware } from './config/security.config';
import userRoute from './routes/user.route';
import cors from 'cors';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import { errorHandler } from './error/errorhandler.handler';

dotenv.config();

const app = express();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

if (!process.env.CORS_ORIGIN) {
    throw new Error('CORS_ORIGIN is not defined');
}

if (!process.env.COOKIE_DOMAIN) {
    throw new Error('CORS_ORIGIN is not defined');
}


/**
 * Map Middleware
 */

app.use(
    process.env.NODE_ENV === 'dev' ? morgan('dev') : morgan('combined')
);
app.use(securityMiddleware);
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(
    cookieSession({
        name: "access_token",
        domain: process.env.COOKIE_DOMAIN,
        signed: false,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })
)
app.use(
    express.json({
        limit: '10mb',
    }),
);



/**
 * Map Routes
 */

app.use('/api/user', userRoute.router);


/**
 * Error Handler
 */

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

