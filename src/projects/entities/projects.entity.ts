import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../../interfaces/project.interface";
import { UsersProjectsEntity } from "../../users-proyects/entities/usersProjects.entity";
import { TasksEntity } from "../../tasks/entities/tasks.entity";




@Entity({name: 'projects'})
export class ProjectsEntity extends BaseEntity implements IProject {
    @Column()
    name: string;
    @Column()
    description: string;
    
    @OneToMany(() => UsersProjectsEntity, (userProject) => userProject.project)
    userProjects: UsersProjectsEntity[];

    @OneToMany(() => TasksEntity, (task) => task.project)
    tasks: TasksEntity[];
}