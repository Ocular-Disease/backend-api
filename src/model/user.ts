import { Column, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

export abstract class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

}