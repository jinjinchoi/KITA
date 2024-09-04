import { Controller, Post, Param, Res, InternalServerErrorException, Headers, Get, Req, UnauthorizedException } from '@nestjs/common';
import { LikesService } from './likes.service';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';

@ApiTags("좋아요")
@Controller('like')
export class LikesController {
  constructor(
    private readonly likesService: LikesService,
    private readonly userService : UsersService
  ) {}

  // 좋아요!!
  @Post("LikeUpdate/:category/:id")
  @ApiOperation({summary: "좋아요"})
  @ApiResponse({status: 201, description: "좋아요 업데이트 성공"})
  async likeToggle(
    @Headers(`userToken`) userToken : string,
    @Param('category') category :string,
    @Param('id')id : string,
    @Res() res: Response,
    @Req() req: Request,
  ) : Promise<Response> {
    const boardId = Number(id);
    try {
      const userinfo = await this.userService.verifyToken(req.cookies.token);
      const resultMessage : string = await this.likesService.updateLikeStatus(boardId, category, userinfo.username);
      return res.status(201).json({mesaage: resultMessage});
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException("유효하지 않은 토큰")
      } else {
        throw  new InternalServerErrorException(err.mesaage);
      }
    }
  }

  // 좋아요 했는지
  @Get('whetherLike/:category/:id')
  @ApiOperation({summary: "좋아요 했는지 확인"})
  @ApiResponse({status: 200, description: "좋아요 조회 성공"})
  async findUserLikeInfo(
    @Param('id') boardId: string,
    @Param('category') category : string,
    @Res() res : Response,
    @Req() req : Request,
  ) {
    const userinfo = await this.userService.verifyToken(req.cookies.token);
    const isLike : boolean = await this.likesService.WhetherLike(+boardId, category, userinfo.username);
    return res.status(200).json({message : "조회 성공", isLike});
  }
}
