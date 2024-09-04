import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reply } from './entities/comment.entity';
import { Board } from 'src/board/entities/board.entity';
import { IReply } from './interface/comment.interface';

@Injectable()
export class CommentService {
  constructor(
  @InjectModel(Reply)
  private readonly ReplyEntity : typeof Reply,
  @InjectModel(Board)
  private readonly BoardEntity : typeof Board
  ) {}

  // 댓글 조회
  async findAll(boardId: number, category: string, limit: number, offset: number): Promise<IReply[]> {
    const safeLimit : number  = Number.isNaN(limit) || limit < 1 ? 10 : limit;
    const safeOffset : number = Number.isNaN(offset) || offset < 0 ? 0 : offset;

    const originalComment = await this.ReplyEntity.findAll({
      where: {boardId, category, parentId: null},
      limit : safeLimit,
      offset : safeOffset,
      order: [['createdAt', 'ASC'], ['id', 'ASC']],
      include: [{
        model: Reply,
        as: 'replies',
        required: false,
        order: [['createdAt', 'ASC'], ['id', 'ASC']],
        paranoid : false,
      }],
      paranoid : false,
    })

    const transformReply = (reply): IReply => {
      return {
        id: reply.id,
        uid: reply.uid,
        unickname: reply.unickname,
        uprofile : reply.uprofile,
        boardId: reply.boardId,
        category: reply.category,
        replyContent: reply.deletedAt ? '삭제된 댓글입니다.' : reply.replyContent,
        parentId: reply.parentId,
        replyFile: reply.replyFile,
        createdAt: reply.createdAt,
        updatedAt: reply.updatedAt,
        deletedAt: reply.deletedAt,
        isDeleted: !!reply.deletedAt,
        replies: reply.replies ? reply.replies.map(transformReply) : [],
      };
    };

    return originalComment.map(transformReply);

  }

  // 댓글 생성
  async create(createCommentDto: CreateCommentDto, category:string, boardId:number) : Promise<Reply> {
    try {
      const { uid, unickname, uprofile, replyContent, replyFile, parentId } = createCommentDto;
      const result =  await this.ReplyEntity.create({
        uid, unickname, uprofile, boardId, replyContent, replyFile, category, parentId
      })
      await this.countReply(boardId);

      return result;

    } catch (err) {
      if(err.name === "SequelizeForeignKeyConstraintError"){
        throw new Error("ForeignKeyConstraintError");
      }
      throw err;
    }
  }


  // 댓글 수정
  async update(boardId: number, updateCommentDto: UpdateCommentDto): Promise<Reply> {
    let {replyContent, id : replyId, replyFile} = updateCommentDto
    const comment = await this.ReplyEntity.findByPk(replyId);

    if(!replyFile && comment.replyFile) {
      replyFile = comment.replyFile
    }
    if(!comment) {
      throw new Error("reply does not exist");
    }

    return comment.update({replyContent, replyFile});
  }

  // 댓글 수 카운트
  async countReply(boardId : number) : Promise<void> {
    const count = await this.ReplyEntity.count({where: {boardId}});
    await this.BoardEntity.update({numberOfComment : count}, {where : {id : boardId}});
  }

  // 댓글 삭제
  async softRemove(id: number, boardId : number): Promise<void> {
    const numberOfAffectedRows = await this.ReplyEntity.destroy({
      where : {id}
    })
    
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("댓글을 찾을 수 없습니다.");
    }

    await this.countReply(boardId);
  }
}
