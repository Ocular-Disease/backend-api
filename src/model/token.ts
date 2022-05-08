import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";
import {Admin} from "./admin";
import {Medecin} from "./medecin";
import {Exclude} from "class-transformer";


@Entity("token")
export class Token {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "varchar", length: 255})
    refreshToken!: string;

    @Column({name: "user_id", type: "varchar"})
    user!: string;
}