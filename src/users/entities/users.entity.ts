import { Exclude } from "class-transformer";
import { BaseEntity } from "../../config/base.entity";
import { ROLES } from "../../constants/roles";
import { IUser } from "../../interfaces/user.interface";
import { UsersProjectsEntity } from "../../users-proyects/entities/usersProjects.entity";
import { Column, Entity, OneToMany } from "typeorm";


@Entity({name: 'users'})
export class UserEntity extends BaseEntity implements IUser {
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    age: number;
    @Column({unique: true})
    email: string;
    @Column({unique: true})
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column({type: 'enum', enum: ROLES})
    role: ROLES;

    @OneToMany(() => UsersProjectsEntity, (userProject) => userProject.user)
    userProjects: UsersProjectsEntity[];
    
} 