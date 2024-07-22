import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectsEntity } from '../entities/projects.entity';
import { ErrorMenager } from '../../utils/error.manager';
import { ProjectDTO, UpdateProjectDTO } from '../dto/project.dto';
import { UsersProjectsEntity } from 'src/users-proyects/entities/usersProjects.entity';
import { UserDTO, UserProjectDTO } from 'src/users/dto/user.dto';
import { UserEntity } from 'src/users/entities/users.entity';

@Injectable()
export class ProjectsService {

    constructor(
        @InjectRepository(ProjectsEntity) private readonly projectRespository: Repository<ProjectsEntity>,
        @InjectRepository(UsersProjectsEntity) private readonly userProjectRespository: Repository<UsersProjectsEntity>,
    ){}

    
    public async create(body: ProjectDTO, user: UserEntity ): Promise<ProjectsEntity>{
        try {

            const project: ProjectsEntity = await this.projectRespository.save(body)

            if (!project) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se creo el proyecto'
                })
            }

            const assignProject: UserProjectDTO = {
                accesslevel: 50,
                project,
                user

            }

            const userProjects: UsersProjectsEntity = await this.userProjectRespository.save(assignProject)
        
            if (!userProjects) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se asigno al proyecto'
                })
            }

            return project;

        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

    public async getAll(): Promise<ProjectsEntity[]>{
        try {
            const projects: ProjectsEntity[] = await this.projectRespository.find()
        
            if (!projects || projects.length === 0) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontro resultados'
                })
            }
        
            return projects;
        
        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

    public async getById(id: string): Promise<ProjectsEntity>{
        try {
            const project: ProjectsEntity = await this.projectRespository
            .createQueryBuilder('project')
            .where({id})
            .leftJoinAndSelect('project.userProjects','userProjects')
            .leftJoinAndSelect('userProjects.user','user')
            .leftJoinAndSelect('project.tasks','tasks')
            .getOne();

            if (!project) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontro resultado'
                })
            }
        
            return project;

        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

    public async update(id: string, body: UpdateProjectDTO): Promise<UpdateResult | undefined>{
        try {
            const project: UpdateResult = await this.projectRespository.update(id, body);
            
            if (project.affected === 0) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo actualizar'
                })
            }
            return project;
        
        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

    public async delete(id: string): Promise<DeleteResult>{
        try {
            const project: DeleteResult = await this.projectRespository.delete(id);
            
            if (project.affected === 0) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo borrar'
                })
            }
            return project;
        
        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

}
