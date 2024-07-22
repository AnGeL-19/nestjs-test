import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProjectDTO, UpdateProjectDTO } from '../dto/project.dto';
import { ProjectsService } from '../service/projects.service';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { RolesAccess } from '../../auth/decorators/roles.decorator';
import { LevelAccess } from '../../auth/decorators/access-level.decorator';
import { ACCESS_LEVEL } from '../../constants/roles';
import { Request } from 'express';
import { UsersService } from 'src/users/service/users.service';

@Controller('projects')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class ProjectsController {

    constructor(
        private readonly projectsService: ProjectsService,
        private readonly userService: UsersService,
    ){}
    
    @RolesAccess('BASIC')
    
    @Get('all')
    public async getAllProjects(){
        return this.projectsService.getAll()
    }
 
    @RolesAccess('BASIC')
    @LevelAccess(ACCESS_LEVEL.OWNER)
    @Get(':id')
    public async getByIdProject(@Param('id') id:string){
        return this.projectsService.getById(id)
    }

    @RolesAccess('BASIC')
    @LevelAccess(ACCESS_LEVEL.OWNER)
    @Post('register')
    public async createProject(@Body() project: ProjectDTO, @Req() request: Request ){

        const req = request;

        const user = await this.userService.getById(req.idUser);

        console.log(req.idUser);
    
        return this.projectsService.create(project, user)
        
    }

    @RolesAccess('BASIC')
    @LevelAccess(ACCESS_LEVEL.OWNER)
    @Put('edit/:id')
    public async updateProject(@Param() id: string,@Body() project: UpdateProjectDTO){
        return this.projectsService.update(id,project)
    }

    @Put('delete/:id')
    public async deleteProject(@Param() id: string){
        return this.projectsService.delete(id)
    }


}
