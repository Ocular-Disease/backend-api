import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty } from 'class-validator'

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

    @Column()
    @IsNotEmpty()
    firstName!: string

    @Column()
    @IsNotEmpty()
    lastName!: string

    @Column()
    @IsBoolean()
    isActive!: boolean
}