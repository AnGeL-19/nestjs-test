import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from '../../constants/key-decorators';
import { IUseToken } from '../../interfaces/auth.interface';
import { UsersService } from '../../users/service/users.service';
import { useToken } from '../../utils/use.token';

@Injectable()
export class AuthGuard implements CanActivate {

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
    
    const req = context.switchToHttp().getRequest<Request>()

    const token = req.headers['access_token']

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token')
    }

    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token expired')
    }

    const { sub } = manageToken;
    const user = await this.userService.getById(sub);

    if (!user) {
      throw new UnauthorizedException('Invalid user')
    }

    req.idUser = user.id;
    req.roleUser = user.role;

    return true;
  }
}
