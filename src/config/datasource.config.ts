import { DataSource } from "typeorm";
import { User } from "../model/user";
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from "./env.config";

const PostgresDataSource = new DataSource({
    name: "default",
    type: "postgres",
    host: config.DB_HOST,
    port: 5432,
    username: "postgres",
    password: config.DB_PASSWORD,
    database: "oculardb",
    entities: [
        User
    ],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy(),
});

export { PostgresDataSource };