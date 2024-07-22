import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { ACCESS_LEVEL, ROLES } from '../../constants/roles';
import { IUser } from '../../interfaces/user.interface';
import { UserEntity } from '../entities/users.entity';
import { ProjectsEntity } from '../../projects/entities/projects.entity';

export class UserDTO implements IUser {

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

}

export class UpdateUserDTO implements IUser {

    @IsOptional()
    @IsString()
    firstName: string;
  
    @IsOptional()
    @IsString()
    lastName: string;
  
    @IsOptional()
    @IsNumber()
    age: number;
  
    @IsOptional()
    @IsString()
    username: string;
  
    @IsOptional()
    @IsEnum(ROLES)
    role: ROLES;
  
    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;
  
    @IsOptional()
    @IsString()
    password: string;
    
  }

export class UserProjectDTO {
  
  @IsNotEmpty()
  @IsUUID()
  user: UserEntity

  @IsNotEmpty()
  @IsUUID()
  project: ProjectsEntity

  @IsNotEmpty()
  @IsEnum(ACCESS_LEVEL)
  accesslevel: ACCESS_LEVEL

}