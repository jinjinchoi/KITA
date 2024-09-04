import { Controller, Post, Body, Patch, Param, Delete, Res, InternalServerErrorException, Headers, ValidationPipe, Req, UnauthorizedException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Reply } from './entities/comment.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@ApiTags("댓글 API")
@Controller('board/:category')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService : UsersService,
  ) {}

  
  @Post(':id/replyCreate')
  @ApiOperation({summary : "댓글 작성"})
  @ApiResponse({status: 201, description: "댓글 생성 성공"})
  @ApiBody({type: CreateCommentDto})
  async create(
    @Body(new ValidationPipe()) createCommentDto: CreateCommentDto,
    @Param('category') category : string,
    @Param('id') id : string,
    @Res() res: Response,
    @Req() req: Request,
    ): Promise<Response> {
    try {
      const userInfo = await this.userService.verifyToken(req.cookies.token);

      const boardId = Number(id);

      // 토큰에서 닉네임이랑 아이디 가져옴
      createCommentDto.uid = userInfo.username;
      createCommentDto.unickname = userInfo.sub;
      if(userInfo.profile) {
        createCommentDto.uprofile = userInfo.profile
      }

      await this.commentService.create(createCommentDto, category, boardId);
      return res.status(201).json({message : "댓글 생성 성공", category, id})
    } catch (err) {
      console.log("comment.controller.ts -> create")
      if(err.message === "ForeignKeyConstraintError") {
        res.status(400).json({ error: '외래키 오류' });
      } else if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException("유효하지 않은 토큰")
      } else {
        res.status(400).json({error : err.message});
      }
    }
  }

  @Patch(':id/replyUpdate')
  @ApiOperation({summary : "댓글 수정"})
  @ApiResponse({status :201, description: "댓글 수정 성공", type: [Reply]})
  @ApiBody({type : UpdateCommentDto})
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateCommentDto: UpdateCommentDto,
    @Res() res: Response,
    @Req() req: Request,
    @Param('categort') category : string,
  ) {
    const boardId = Number(id);
    try {
      await this.userService.verifyToken(req.cookies.token);

      await this.commentService.update(boardId, updateCommentDto);
      res.status(201).json({message: "게시물 수정 완료", boardId, category})

    } catch(err) {
      if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException("유효하지 않은 토큰")
      } else {
        throw  new InternalServerErrorException(err.mesaage);
      }
    }
  }

  @Delete(':boardId/:id/replyDelete')
  @ApiOperation({summary : "댓글 삭제"})
  @ApiResponse({status:201, description: "댓글 삭제 완료"})
  async remove(
    @Param('boardId') boardId : string,
    @Param('id') id: string,
    @Param('category') category : string,
    @Res() res: Response,
    @Req() req: Request,
  ) : Promise<Response> {
    try {
      await this.userService.verifyToken(req.cookies.token);

      const parsedId = Number(id);
      const parseBoardId = Number(boardId);
      await this.commentService.softRemove(parsedId, parseBoardId);
      return res.status(200).json({message: "게시물 삭제 완료", parsedId, category})
    } catch(err) {
      if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException("유효하지 않은 토큰")
      } else {
        throw  new InternalServerErrorException(err.mesaage);
      }
    }
  }
}
