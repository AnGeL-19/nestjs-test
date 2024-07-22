import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProjectsEntity } from "../projects/entities/projects.entity";
import { UsersProjectsEntity } from "../users-proyects/entities/usersProjects.entity";
import { UserEntity } from "../users/entities/users.entity";

import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { TasksEntity } from "../tasks/entities/tasks.entity";

ConfigModule.forRoot({
    envFilePath: '.develop.env'
})

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [UserEntity, ProjectsEntity, UsersProjectsEntity, TasksEntity],
    migrations: ['dist/migrations/*{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy()
  };

export const AppDS = new DataSource(DataSourceConfig)