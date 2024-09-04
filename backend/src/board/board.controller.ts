import { Controller, Get, Post, Body, Param, Query, Res, InternalServerErrorException, UseInterceptors, UploadedFile, Headers, ValidationPipe, Req, UnauthorizedException } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board } from './entities/board.entity';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multer.config';
import { UsersService } from 'src/users/users.service';
// import { IBoard } from './interface/boaard.interface';

@ApiTags("게시판 API")
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly userService : UsersService
  ) {}

  // 게시물 생성 컨트롤러
  @Post(':category/postCreate')
  @UseInterceptors(FileInterceptor('boardFile', multerOptions))
  @ApiOperation({summary : "게시물 생성"})
  @ApiResponse({status: 201, description: "게시물 생성 성공", type: Board})
  @ApiBody({type: CreateBoardDto})
  @ApiHeader({name: 'userToken', description:"사용자 인증 토큰", required: true})
  @ApiHeader({name: 'unickname', description:"닉네임 토큰", required: true})
  async create(
    @Body(new ValidationPipe()) createBoardDto: CreateBoardDto,
    @UploadedFile() file : Express.Multer.File, // 멀터로 파일 받기
    @Param('category') category:string,
    @Res() res : Response,
    @Req() req : Request,
    ) : Promise<Response> {
    try {
    
      const user = await this.userService.verifyToken(req.cookies.token);

      // 파일 있을 경우 데이터베이스에 추가할 경로 입력
      if(file) {
        const filePath = '/img/' + file.filename;
        createBoardDto.boardFile = filePath;
      }

      // 토큰에서 유저 아이디랑 닉네임 받아오기 (추후 복호화 필요)
      createBoardDto.uid = user.username;
      createBoardDto.unickname = user.sub;
      if(user.profile) {
        createBoardDto.uprofile = user.profile
      }
 

      await this.boardService.create(createBoardDto, category);
      return res.status(201).json({message: "게시물 생성 성공!", category})
    } catch (err) {
      if(err.message === "ForeignKeyConstraintError") {
        res.status(400).json({ error: '외래키 오류' });
      } else if (err instanceof UnauthorizedException) {
        throw new UnauthorizedException("유효하지 않은 토큰")
      } else {
        res.status(400).json({error : err.message});
      }
    }
  }

  // 카테고리 게시물 조회 컨트롤러
  @Get()
  @ApiOperation({summary: "전체 게시판 조회"})
  @ApiResponse({status: 200, description: "게시물 조회 성공", type: [Board]})
  async findAll(  
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
    @Res() res : Response
  ): Promise<Response> {
    let parsedLimit : number = Number(limit);
    let parsedOffset : number = Number(offset);
    try {
      const postList = await this.boardService.findAll(parsedLimit, parsedOffset);
      console.log("테스트")
      return res.status(200).json({message: "전체 게시물 조회 성공", postList})
    } catch (err) {
      throw new InternalServerErrorException (err.message);
    }
  }

  
  @Get(':category')
  @ApiOperation({summary: "게시판 조회"})
  @ApiResponse({status: 200, description: "게시물 조회 성공", type: [Board]})
  async findCategory(  
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
    @Param('category') category: string,
    @Res() res: Response,
  ): Promise<Response> {
    let parsedLimit : number = Number(limit);
    let parsedOffset : number = Number(offset);
    try {
      const postList = await this.boardService.findAll(parsedLimit, parsedOffset, category);
      return res.status(200).json({message: "특정 게시물 조회 성공", postList});
    } catch (err) {
      throw new InternalServerErrorException (err.message);
    }
  }

  // 검색 컨트롤러
  @Get("logic/search/implement")
  @ApiOperation({summary : "게시물 검색"})
  @ApiResponse({status: 200, description: "게시물 검색 성공", type: [Board]})
  async searchController(
    @Query('word') word: string,
    @Query('limit') limit: string = '10',
    @Query('offset') offset: string = '0',
    @Res() res : Response,
  ) : Promise<Response> {
    let parsedLimit : number = Number(limit);
    let parsedOffset : number = Number(offset);
    try {
      const postList = await this.boardService.searchBoard(parsedLimit, parsedOffset, word);
      return res.status(200).json({message: "게시물 검색 성공", postList} );
    } catch(err) {
      console.error('Search error:', err.message);
      throw new InternalServerErrorException (err.message)
    }
  }

  // 쿠키 존재하는지 확인
  @Get("Login/cookie/exist")
  @ApiOperation({summary : "쿠키 존재하는지 확인"})
  cookieCheckController(
    @Req() req : Request
  ) {
    const hasToken = req.cookies.token ? true : false;
    return { isLogin : hasToken};
  }

}
