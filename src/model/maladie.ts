import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Stade } from "./stade";


@Entity("maladie")
export class Maladie {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    nom!: string;

    @Column()
    description!: string;

    @OneToMany(type => Stade, stade => stade.maladie)
    stades!: Stade[];
}