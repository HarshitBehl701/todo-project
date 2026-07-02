import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from 'generated/prisma/browser';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers()
    }

    @Get('/:id')
    getUser(@Param('id') id: string): Promise<User | null> {
        return this.userService.getUser(id)
    }

    @Post('/create')
    createUser(data: CreateUserDTO): Promise<User> {
        return this.userService.createUser(data)
    }

    @Put('/update/:id')
    updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO): Promise<User> {
        return this.userService.updateUser({
            where: {
                id: +id
            },
            data
        })
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser({ id: +id })
    }

}
