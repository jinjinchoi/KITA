import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entities/users.entity';


@Module({
  imports : [SequelizeModule.forFeature([User]),
  HttpModule,
  AuthModule
],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports : [UsersModule]
})
export class UsersModule {}
