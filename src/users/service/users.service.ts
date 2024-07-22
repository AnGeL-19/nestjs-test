import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/users.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult,  } from 'typeorm';
import { UpdateUserDTO, UserDTO, UserProjectDTO } from '../dto/user.dto';
import { ErrorMenager } from '../../utils/error.manager';
import { UsersProjectsEntity } from '../../users-proyects/entities/usersProjects.entity';
import * as bcrypt from 'bcrypt';

type UserWithoutPassword = Omit<UserEntity, 'password'>;

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(UsersProjectsEntity)
        private readonly userProjectRepository: Repository<UsersProjectsEntity>
    ){}

    public async create(body: UserDTO): Promise<UserWithoutPassword>{
        try {

            body.password = await bcrypt.hash(body.password, +process.env.HASH_SALT);

            const userSaved: UserEntity = await this.userRepository.save(body)
        
            if (!userSaved) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se creo usuario'
                })
            }

            const {password, ...rest} = userSaved;

            return {...rest};

        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

    public async assignToProject(body: UserProjectDTO): Promise<UsersProjectsEntity>{
        try {
            const userProjects: UsersProjectsEntity = await this.userProjectRepository.save(body)
        
            if (!userProjects) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se asigno el proyecto'
                })
            }

            return userProjects;

        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

    public async getAll(): Promise<UserEntity[]>{
        try {
            const users: UserEntity[] = await this.userRepository.find()
        
            if (!users || users.length === 0) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontro resultados'
                })
            }
        
            return users;
        
        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

    public async getById(id: string): Promise<UserEntity>{
        try {
            const user: UserEntity = await this.userRepository
            .createQueryBuilder('user')
            .where({id})
            .leftJoinAndSelect('user.userProjects','userProjects')
            .leftJoinAndSelect('userProjects.project','project')
            .getOne();

            if (!user) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se encontro resultados'
                })
            }
        
            return user;

        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

    public async findBy({key, value}: {key: keyof UserDTO, value: any}): Promise<UserEntity>{
        try {
            const user: UserEntity = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where({ [key]: value })
            .getOne();

            return user;

        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

    public async update(id: string, body: UpdateUserDTO): Promise<UpdateResult | undefined>{
        try {
            const user: UpdateResult = await this.userRepository.update(id, body);
            
            if (user.affected === 0) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo actualizar usuario'
                })
            }
            return user;
        
        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

    public async delete(id: string): Promise<DeleteResult>{
        try {
            const user: DeleteResult = await this.userRepository.delete(id);
            
            if (user.affected === 0) {
                throw new ErrorMenager({
                    type: 'BAD_REQUEST',
                    message: 'No se pudo borrar el usuario'
                })
            }
            return user;
        
        } catch (error) {
            throw ErrorMenager.createSignatureError(error.message)
        }
    }

}
