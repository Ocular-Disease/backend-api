import { DataSource } from "typeorm";
import { User } from "../model/user";
import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

const PostgresDataSource = new DataSource({
    name: "default",
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: "postgres",
    password: process.env.DB_PASSWORD,
    database: "oculardb",
    entities: [
        User
    ],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
});

export { PostgresDataSource };