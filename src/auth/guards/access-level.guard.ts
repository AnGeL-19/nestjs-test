import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ACCESS_LEVEL_KEY, ADMIN_KEY, PUBLIC_KEY } from '../../constants/key-decorators';
import { ACCESS_LEVEL, ROLES } from '../../constants/roles';
import { UsersService } from '../../users/service/users.service';

@Injectable()
export class AccessLevelGuard implements CanActivate {
  
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector
  ){}
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler()
    );

    if (isPublic) {
      return true;
    }

    
    const accessLevel = this.reflector.get<ACCESS_LEVEL>(
      ACCESS_LEVEL_KEY,
      context.getHandler()
    );

    const admin = this.reflector.get<string>(
      ADMIN_KEY,
      context.getHandler()
    );

    console.log(accessLevel, 'accessLevel');
    

    const req = context.switchToHttp().getRequest<Request>()
    
    const { idUser, roleUser } = req;

    console.log(roleUser, ROLES.ADMIN);


    if (roleUser === ROLES.ADMIN) {
      return true
    }

    const user = await this.userService.getById(idUser)

    const userExistInProject = user.userProjects.find(
      (project) => project.project.id === req.params.id
    )


    if (!userExistInProject || userExistInProject === undefined) {
      throw new UnauthorizedException('You dont have access to the project')
    }
    
    if (accessLevel !== userExistInProject.accesslevel ) {
      throw new UnauthorizedException('You dont have nivel access to the project')
    }
    
    return true;
  }
}
