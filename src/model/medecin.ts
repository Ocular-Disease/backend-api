import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user';

@Entity()
export class Medecin extends User {
	@Column()
	private specialite!: string;
}
