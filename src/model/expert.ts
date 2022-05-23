import { Entity } from "typeorm";
import { User } from "./user";


@Entity("expert")
export class Expert extends User {

}