import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AnimalsService {
    constructor(private jwtService: JwtService, private dbService: PrismaService) { }

    async getAllAnimals() {
        return this.dbService.animals.findMany();
    }

    async createAnimal(dto: any) {
        let createAnimal = await this.dbService.animals.create({
            data: dto
        })
        if (createAnimal) {
            return {
                statusCode: 200,
                message: 'Data Hewan Berhasil Disimpan!',
                data: createAnimal
            };
        }
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    async updateAnimal(animalId: number, updateDto: UpdateDto) {
        const animal = await this.dbService.animals.findUnique({ where: { id: animalId } });
    if (!animal) {
        return null;
    }
    const updatedAnimal = await this.dbService.animals.update({
        where: { id: animalId },
        data: {...updateDto, updated_at: new Date()},
    });

    return updatedAnimal;
    }

    async deleteAnimal(userId: number) {
        const deletedAnimal = await this.dbService.animals.delete({ where: { id: userId } });
        return deletedAnimal;
    }
}
