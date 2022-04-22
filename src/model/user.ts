import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class User {

    @PrimaryGeneratedColumn("uuid")
    @Column()
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