import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UpdateUserDTO, UserDTO, UserProjectDTO } from '../dto/user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ){}
    
    @AdminAccess()
    // @RolesAccess('BASIC')
    @Get('all')
    public async getAllUsers(){
        return this.usersService.getAll()
    }

    @PublicAccess()
    @Get(':id')
    public async getByIdUser(@Param('id') id:string){
        return this.usersService.getById(id)
    }

    @Post('register')
    public async createUser(@Body() user: UserDTO){

        return this.usersService.create(user);
    }

    @Post('assing-to-project')
    public async assingUserToProject(@Body() userProject: UserProjectDTO){
        return this.usersService.assignToProject(userProject)
    }

    @Put('edit/:id')
    public async updateUser(@Param() id: string,@Body() user: UpdateUserDTO){
        return this.usersService.update(id,user)
    }

    @Put('delete/:id')
    public async deleteUser(@Param() id: string){
        return this.usersService.delete(id)
    }

}
