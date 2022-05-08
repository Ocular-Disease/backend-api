import {Column, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';
import {Token} from "./token";

export abstract class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	firstName!: string;

	@Column()
	lastName!: string;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@OneToMany(type => Token, token => token.user)
	tokens!: Token[];
}
