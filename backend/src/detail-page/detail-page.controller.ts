import { Controller, Get, Post, Body, Patch, Param, Delete, Query, InternalServerErrorException, Res, Headers, UploadedFile, UseInterceptors, Req, UnauthorizedException } from '@nestjs/common';
import { DetailPageService } from './detail-page.service';
import { UpdateDetailPageDto } from './dto/update-detail-page.dto';
import { Board } from 'src/board/entities/board.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multer.config';
import { UsersService } from 'src/users/users.service';

@ApiTags("상세페이지 API")
@Controller('board/:category')
export class DetailPageController {
  constructor(
    private readonly detailPageService: DetailPageService,
    private readonly userService : UsersService
  ) {}

  // 게시물 조회 컨트롤러
  @Get(":id")
  @ApiOperation({summary : "게시물 및 댓글 조회"})
  @ApiResponse({status: 201, description : "게시물 조회 완료", type : Board})
  async getDetailPage(
    @Param("category") category: string,
    @Param("id") id: string,
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
    @Res() res: Response,
  ): Promise<Response> {
    const parsedId = Number(id);
    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset)
    try {
      const content = await this.detailPageService.getContentAndReply(parsedId, category, parsedLimit, parsedOffset);
      return res.status(200).json({message: "게시물 조회 성공", wholeContents : content})
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }


  // 게시물 수정 컨트롤러
  @Patch(':id/postUpdate')
  @UseInterceptors(FileInterceptor('boardFile', multerOptions))
  @ApiOperation({summary: "게시물 수정"})
  @ApiResponse({status:201, description: "게시물 수정 완료"})
  @ApiBody({type: UpdateDetailPageDto})
  async update(
    @Param('category') category : string,
    @Param('id') id: string,
    @Body() updateDetailPageDto: UpdateDetailPageDto,
    @UploadedFile() file : Express.Multer.File,
    @Res() res : Response,
    @Req() req : Request
  ): Promise<Response> {
    try{
      await this.userService.verifyToken(req.cookies.token);
      

      // 파일이 있으면 경로 추가
      if(file) {
        const filePath = '/img/' + file.filename;
        updateDetailPageDto.boardFile = filePath;
      }
      await this.detailPageService.update(+id, updateDetailPageDto);
      return res.status(200).json({message: "게시물 수정 완료", id, category});
    } catch(err) {
      if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException("유효하지 않은 토큰")
      } else {
        throw  new InternalServerErrorException(err.mesaage);
      }
    }
  }


  // 게시물 삭제 컨트롤러
  @Delete(':id/postDelete')
  @ApiOperation({summary : "게시물 삭제"})
  async remove(
    @Param('id') id: string,
    @Param('category') category: string,
    @Res()res : Response,
    @Req()req : Request,
  ) : Promise<Response> {
    try {
      await this.userService.verifyToken(req.cookies.token);
      await this.detailPageService.softRemove(+id);
      return res.status(200).json({message: "게시물 삭제 완료", category});
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException("유효하지 않은 토큰")
      } else {
        throw new InternalServerErrorException(err.mesaage);
      }
    }
  }
}
