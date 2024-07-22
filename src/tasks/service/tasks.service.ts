import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksEntity } from '../entities/tasks.entity';
import { TaskDTO } from '../dto/task.dto';
import { ErrorMenager } from 'src/utils/error.manager';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TasksEntity)
        private readonly taskRepository: Repository<TasksEntity>,
    ){}

    public async create(body: TaskDTO): Promise<TasksEntity>{

        try {

            const taskSaved = this.taskRepository.save(body)

            if (!taskSaved) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se tarea'
                })
            }

            return taskSaved;

        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }

        

    }

}
