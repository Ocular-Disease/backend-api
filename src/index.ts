import 'express-async-errors';
import { PostgresDataSource } from './config/datasource.config';
import { App } from './server';
import { config } from './config/env.config';

if (Object.values(config).some(value => value === '')) {
    throw new Error(`Missing environment variables ${Object.entries(config).find(([key, value]) => value === '')}`);
}




async function main() {

    try {
        await PostgresDataSource.initialize();

        console.log("Connected to DB");

        const app = new App();
        app.listen(() => {
            console.log(`Server is running on port ${config.port}`);
        });

    } catch (error: any) {
        console.error(error.message);
    }
}

main();

