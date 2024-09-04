import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './entities/like.entity';
import { Board } from 'src/board/entities/board.entity';
import { Sequelize } from 'sequelize';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like)
    private readonly LikeEntity: typeof Like,
    @InjectModel(Board)
    private readonly BoardEntity: typeof Board
  ) {}

  // 좋아요 갯수 카운트
  async countLike(boardId: number, category: string) : Promise<number> {
    return this.LikeEntity.count({where : {boardId, category}});
  }

  // 좋아요 토글
  async updateLikeStatus(boardId: number, category: string, uid: string) : Promise<string> {
    const existingLike = await this.LikeEntity.findOne({
      where: {boardId, uid, category}
    });

    if(existingLike) {
      await existingLike.destroy();
      await this.BoardEntity.update(
        {boardLike: Sequelize.literal('boardLike - 1')},
        {where : {id: boardId, categories: category}},
      )
      const result:string = "좋아요 취소"
      return result;
    } else {
      await this.LikeEntity.create({boardId, category, uid});
      await this.BoardEntity.update(
        {boardLike: Sequelize.literal('boardLike + 1')},
        {where : {id: boardId, categories: category}},
      )
      const result:string = "좋아요"
      return result;
    }
  }

  // 좋아요 유무 판단
  async WhetherLike(boardId: number, category: string, uid?: string) : Promise<boolean> {
    if(!uid)
      return false;
    
    const existingLike = await this.LikeEntity.findOne({
      where: {boardId, uid, category}
    });

    if(existingLike) {
      return true;
    } else{
      return false;
    }
  }
}
