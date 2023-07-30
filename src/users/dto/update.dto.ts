import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateDto } from './create.dto';
import { IsNotEmpty } from 'class-validator';
import { Prisma } from '@prisma/client';

export class UpdateDto extends PartialType(CreateDto) implements Prisma.usersUpdateInput{

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

}
