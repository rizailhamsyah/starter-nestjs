import { Body, Controller, Get, HttpCode, Post, Put, Delete, Param, ParseIntPipe,NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { CreateDto } from './dto/create.dto';
import { UpdateDto } from './dto/update.dto';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {

    constructor(private animalsService: AnimalsService) {

    }

    @Get()
    async getAllAnimals() {
        return this.animalsService.getAllAnimals();
    }

    @HttpCode(200)
    @Post('create')
    async register(@Body() dto: CreateDto) {
        return await this.animalsService.createAnimal(dto);
    }

    @HttpCode(200)
    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateDto) {
        const updatedAnimal = await this.animalsService.updateAnimal(id, updateDto);
        if (!updatedAnimal) {
        throw new NotFoundException('Hewan Tidak Dapat Ditemukan!');
    }
        return { statusCode: 200,
                 message: 'Hewan berhasil diubah!',
                 data: updatedAnimal
                };
    }

    @HttpCode(200)
    @Delete(':id')
    async deleteAnimal(@Param('id', ParseIntPipe) id: number) {
        const deletedAnimal = await this.animalsService.deleteAnimal(id);
        if (!deletedAnimal) {
        throw new NotFoundException('Hewan Tidak Dapat Ditemukan!');
        }
        return { statusCode: 200,
                 message: 'Hewan berhasil dihapus!' };
    }
}
