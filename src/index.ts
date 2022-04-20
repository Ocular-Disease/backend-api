import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import userRoute from './routes/user.route';

dotenv.config();

const app = express();

/**
 * Map Middleware
 */

app.use(
    process.env.NODE_ENV === 'dev' ? morgan('dev') : morgan('combined')
);


/**
 * Map Routes
 */

app.use('/api/user', userRoute.router);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

