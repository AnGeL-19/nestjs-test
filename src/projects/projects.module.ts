import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from './entities/projects.entity';
import { UsersProjectsEntity } from 'src/users-proyects/entities/usersProjects.entity';
import { ProjectsService } from './service/projects.service';
import { ProjectsController } from './controller/projects.controller';
import { UsersService } from '../users/service/users.service';
import { UserEntity } from '../users/entities/users.entity';
import { TasksEntity } from '../tasks/entities/tasks.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ProjectsEntity, UsersProjectsEntity, UserEntity, TasksEntity])],
    providers: [ProjectsService, UsersService],
    controllers: [ProjectsController],
})
export class ProjectsModule {}
