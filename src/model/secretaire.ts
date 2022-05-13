import { Entity, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class Secretaire extends User {
	
}
