import { Module } from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { TasksController } from './controller/tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsEntity } from '../projects/entities/projects.entity';
import { TasksEntity } from './entities/tasks.entity';
import { UsersService } from 'src/users/service/users.service';
import { UserEntity } from 'src/users/entities/users.entity';
import { UsersProjectsEntity } from 'src/users-proyects/entities/usersProjects.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity ,ProjectsEntity, UserEntity, UsersProjectsEntity ])],
  providers: [TasksService, UsersService],
  controllers: [TasksController]
})
export class TasksModule {}
