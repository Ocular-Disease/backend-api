import { Entity, ManyToOne } from 'typeorm';
import { Medecin } from './medecin';
import { User } from './user';

@Entity()
export class Secretaire extends User {
	
}