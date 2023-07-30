import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { CreateDto } from './create.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateDto extends PartialType(CreateDto) {

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

}
