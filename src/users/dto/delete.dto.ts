import { IsNotEmpty } from 'class-validator';
import { Prisma } from '@prisma/client';

export class DeleteDto implements Prisma.usersWhereInput {
  @IsNotEmpty()
  id: number;
}
