import 'express-async-errors';
import { PostgresDataSource } from './config/datasource.config';
import { App } from './server';



if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

if (!process.env.CORS_ORIGIN) {
    throw new Error('CORS_ORIGIN is not defined');
}

if (!process.env.COOKIE_DOMAIN) {
    throw new Error('CORS_ORIGIN is not defined');
}




async function main() {

    try {
        await PostgresDataSource.initialize();

        console.log("Connected to DB");

        const app = new App();
        app.listen(() => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });

    } catch (error: any) {
        console.error(error.message);
    }
}

main();

