import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    idEmployee: string;
    @Column('text')
    name: string;
    @Column('text')
    lastName: string;
    @Column('text')
    phoneNumber: string;
    @Column('text')
    email: string;
}
