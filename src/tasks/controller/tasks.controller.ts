import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { TaskDTO } from '../dto/task.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { RolesAccess } from 'src/auth/decorators/roles.decorator';
import { LevelAccess } from 'src/auth/decorators/access-level.decorator';
import { ACCESS_LEVEL } from 'src/constants/roles';

@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {

    constructor(
        private readonly taskService: TasksService
    ){}

    @RolesAccess('BASIC')
    @LevelAccess(ACCESS_LEVEL.MANTEINER)
    @Post('register')
    public async create(@Body() body: TaskDTO){
        return this.taskService.create(body)
    }


}
