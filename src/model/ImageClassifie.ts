import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stade } from "./stade";


@Entity("image_classifie")
export class ImageClassifie {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    url!: string;

    @Column()
    nom!: string;

    @ManyToOne(type => Stade, stade => stade.imagesClassifies, { onDelete: "CASCADE", cascade: true })
    stade!: Stade;
}