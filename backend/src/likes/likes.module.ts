import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './entities/like.entity';
import { Board } from 'src/board/entities/board.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Board, Like, User])],
  controllers: [LikesController],
  providers: [LikesService, UsersService, JwtService],
})
export class LikesModule {}
