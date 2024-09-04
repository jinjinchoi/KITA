import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reply } from './entities/comment.entity';
import { Board } from 'src/board/entities/board.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([Reply, Board, User])],
  controllers: [CommentController],
  providers: [CommentService, JwtService, UsersService],
  exports: [CommentService]
})
export class CommentModule {}
