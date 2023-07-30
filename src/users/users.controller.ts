import { Body, Controller, Get, HttpCode, Post, Put, Delete, Param, UsePipes, ValidationPipe, NotFoundException, InternalServerErrorException, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';
import { TransformPasswordPipe } from '../transform-password.pipe';
import * as bcrypt from 'bcrypt';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @UsePipes(ValidationPipe, TransformPasswordPipe)
    // @HttpCode(200)
    @Post('create')
    async createUser(@Body() dto: CreateDto) {
        return await this.usersService.createUser(dto);
    }

    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) userId:number, @Body() updateDto: UpdateDto) {
        try {
            const updatedUser = await this.usersService.updateUser(userId, updateDto);
            if (!updatedUser) {
              throw new NotFoundException('User tidak dapat ditemukan!');
            }
            return { statusCode: 200,
                     message: 'User berhasil diubah!',
                     data : updatedUser };
        } catch (error) {
            console.error('Error while updating user:', error.message);
            throw new InternalServerErrorException('An error occurred while updating user');
        }
    }

    @HttpCode(200)
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) userId:number) {
        const deletedUser = await this.usersService.deleteUser(userId);
        if (!deletedUser) {
        throw new NotFoundException('User Tidak Dapat Ditemukan!');
        }
        return { statusCode: 200,
                 message: 'User berhasil dihapus!' };
    }
}
