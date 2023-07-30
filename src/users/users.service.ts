import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDto } from './dto/update.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private jwtService: JwtService, private dbService: PrismaService) { }

    async getAllUsers() {
        return this.dbService.users.findMany();
    }

    async createUser(dto: any) {
        let user = await this.dbService.users.findFirst({
            where: {
                username: dto.username
            }
        });
        if (user) {
            throw new HttpException('Username Telah Terdaftar!', HttpStatus.BAD_REQUEST);
        }
        let createUser = await this.dbService.users.create({
            data: dto
        })
        if (createUser) {
            return {
                statusCode: 200,
                message: 'User Berhasil Disimpan!',
                data : createUser
            };
        }
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    async updateUser(userId: number, updateDto: UpdateDto) {
    const user = await this.dbService.users.findUnique({ where: { id: userId } });
    if (!user) {
        return null;
    }
    if (updateDto.password) {
        updateDto.password = await this.hashPassword(updateDto.password);
    }
    delete updateDto.created_at;
    const updatedUser = await this.dbService.users.update({
        where: { id: userId },
        data: {...updateDto, updated_at: new Date()},
    });

    return updatedUser;
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 12;
        return bcrypt.hash(password, saltRounds);
    }

    async deleteUser(userId: number) {
        const deletedUser = await this.dbService.users.delete({ where: { id: userId } });
        return deletedUser;
    }
}
