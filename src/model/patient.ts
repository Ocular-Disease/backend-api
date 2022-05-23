import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Patient {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

    @Column()
	gender!: string;

    @Column()
	cin!: string;


    @Column()
	number!: string;

	@Column()
	email!: string;

	@Column()
	address!: string;

    @Column()
    height!: number;

    @Column()
    weight!: number;

}
