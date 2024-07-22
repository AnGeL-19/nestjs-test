import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IProject } from "../../interfaces/project.interface";

export class ProjectDTO implements IProject {
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

}

export class UpdateProjectDTO implements IProject {
    
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;

}