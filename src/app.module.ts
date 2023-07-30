import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AnimalsController } from './animals/animals.controller';
import { AnimalsService } from './animals/animals.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: 'Contoh',
      signOptions: { expiresIn: '1h' },
    }),
    ],
  controllers: [AuthController, UsersController, AnimalsController],
  providers: [AuthService, UsersService, AnimalsService, JwtStrategy],
})
export class AppModule {}
