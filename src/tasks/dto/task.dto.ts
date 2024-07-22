import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { STATUS_TASK } from "src/constants/tasks";
import { ITask } from "src/interfaces/task.interface";
import { ProjectsEntity } from "src/projects/entities/projects.entity";


export class TaskDTO implements ITask {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsEnum(STATUS_TASK)
    status: STATUS_TASK;

    @IsNotEmpty()
    @IsString()
    responsable: string;

    @IsNotEmpty()
    @IsUUID()
    project: ProjectsEntity

}