import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImageClassifie } from "./ImageClassifie";
import { Maladie } from "./maladie";


@Entity("stade")
export class Stade {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    nom!: string;

    @Column()
    description!: string;

    @ManyToOne(type => Maladie, maladie => maladie.stades)
    maladie!: Maladie;

    @OneToMany(type => ImageClassifie, imageClassifie => imageClassifie.stade)
    imagesClassifies!: ImageClassifie[];
}