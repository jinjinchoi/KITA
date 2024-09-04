import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Board } from 'src/board/entities/board.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CommentService } from 'src/comment/comment.service';
import { Reply } from 'src/comment/entities/comment.entity';
import { Sequelize } from 'sequelize-typescript';
import { LikesService } from 'src/likes/likes.service';
import * as fs from 'fs/promises';
import { IReply } from 'src/comment/interface/comment.interface';
import * as path from 'path';

@Injectable()
export class DetailPageService {
  constructor(
    @InjectModel(Board)
    private readonly BoardEntity: typeof Board,
    @InjectModel(Reply)
    private readonly ReplyEntity: typeof Reply,
    private readonly commentService: CommentService,
    private readonly likeService: LikesService,
    private readonly sequelize : Sequelize
  ) {}

  // 게시물하고 댓글 가져오는 함수
  async getContentAndReply(boardId: number, category:string, limit? : number, offset?:number) : Promise<{content: Board, reply: IReply[]}> {
    const safeLimit : number  = Number.isNaN(limit) || limit < 1 ? 10 : limit;
    const safeOffset : number = Number.isNaN(offset) || offset < 0 ? 0 : offset;
    
    const result : {content : Board, reply :IReply[]} = await this.sequelize.transaction(async (transaction) => {
      const content : Board | null = await this.BoardEntity.findOne({ where : {id : boardId, categories : category}, transaction});
      if(content) {
        content.boardView += 1;
        await content.save({transaction})
      }
      const reply : IReply[]  = await this.commentService.findAll(boardId, category, safeLimit, safeOffset);
      return {content, reply};
    })

    return result;

  }

  // 게시물 업데이트 함수
  async update(id: number, updateDetailPageDto: Partial<UpdateDetailPageDto>) : Promise<Board> {
    const content = await this.BoardEntity.findByPk(id);
    if(!content) {
      throw new Error("Post does not exist");
    }
    
    const {boardFile, boardContent, boardTitle} = updateDetailPageDto;
    
    const updateData = {
      boardFile : boardFile !== undefined ? boardFile : content.boardFile,
      boardTitle : boardTitle !== undefined ? boardTitle : content.boardTitle,
      boardContent : boardContent !== undefined ? boardContent : content.boardContent
    }

    // 파일 업데이트 시 새 파일이 있으면 기존 파일 삭제
    try {
      if((content.boardFile !== boardFile) && (boardFile) && (content.boardFile)) {
        const staticPath = path.join(__dirname, "..", "..", "static", content.boardFile)
        await fs.unlink(staticPath);
      }
    } catch (err) {
      throw new Error("업데이트 - 기존 파일 삭제 에러 발생")
    }
  
    return content.update(updateData)
  }

  // 게시물 삭제 함수
  async softRemove(id: number): Promise<void>{

    // 게시물 삭제될때 파일도 삭제하는 부분.
    const content = await this.BoardEntity.findByPk(id);
    if(content.boardFile) {
      const staticPath = path.join(__dirname, "..", "..", "static", content.boardFile)
      await fs.unlink(staticPath);
    }

    const affectedRows = await this.BoardEntity.destroy({
      where: {id}
    })

    if(affectedRows === 0) {
      throw new NotFoundException("게시물을 찾을 수 없습니다.")
    } else{
      await this.ReplyEntity.destroy({
        where : {boardId : id}
      })
    }
  }
}
