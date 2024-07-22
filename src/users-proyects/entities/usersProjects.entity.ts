
import { Column,  Entity,  ManyToOne } from "typeorm";

import { ProjectsEntity } from "../../projects/entities/projects.entity";
import { BaseEntity } from "../../config/base.entity";
import { ACCESS_LEVEL } from "../../constants/roles";
import { UserEntity } from "../../users/entities/users.entity";


@Entity('users_projects')
export class UsersProjectsEntity extends BaseEntity {

    @Column({type: 'enum', enum: ACCESS_LEVEL })
    accesslevel: ACCESS_LEVEL

    @ManyToOne( ()=> UserEntity, (user) => user.userProjects)
    user: UserEntity;

    @ManyToOne(()=>ProjectsEntity, (project) => project.userProjects)
    project: ProjectsEntity;

   
}