import { Column, Entity, OneToMany } from "typeorm";
import { Secretaire } from "./secretaire";
import { User } from "./user";

@Entity()
export class Medecin extends User {

    @Column()
    private specialite!: string;

    @OneToMany(type => Secretaire, secretaire => secretaire.medecin)
    secretaires!: Secretaire[];
}