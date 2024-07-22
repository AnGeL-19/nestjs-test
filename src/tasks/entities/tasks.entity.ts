import { BaseEntity } from "../../config/base.entity";
import { STATUS_TASK } from "../../constants/tasks";
import { ProjectsEntity } from "../../projects/entities/projects.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";


@Entity({name: 'tasks'})
export class TasksEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: 'enum', enum: STATUS_TASK})
    status: STATUS_TASK
    
    @Column()
    responsable: string;

    @ManyToOne(() => ProjectsEntity, (project) => project.tasks)
    @JoinColumn({
        name: 'project_id'
    })
    project: ProjectsEntity;
}