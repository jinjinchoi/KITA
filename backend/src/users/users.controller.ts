import {Res, Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, UseGuards, Req, UploadedFile, UseInterceptors, Header, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/AuthGuard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multer.config';
import { Request, Response } from 'express';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    try{
    return this.usersService.create(createUserDto);
    }catch(error){
      console.log('error 발생')
    }
  }

  @Post('signup/idcheck')
  async getUseridCheck(@Headers('uid') uid : any) {
    const userId = await this.usersService.userIdCheck(uid)
    console.log(userId)
    return userId
  } 

  @Get('profile')
  async getProfile(@Req() req:Request) {
    try{1
      const user = await this.usersService.verifyToken(req.cookies.token);
      console.log(user)
      const users = await this.usersService.getUserById(user);
      return users;
    }catch(error){
      throw new UnauthorizedException('유효하지않은 토큰')
    }
  }

  @Get('modify/get')
  async getProfileModify(@Req() req:Request) {
      try{
        const user = await this.usersService.verifyToken(req.cookies.token);
        console.log(user)
        const users = await this.usersService.getUserById(user);
        return users;
      }catch(error){
        throw new UnauthorizedException('유효하지않은 토큰')
      }
    }


  @Post('modify/update')
  @UseInterceptors(FileInterceptor('profile', multerOptions))
  async updateUser(
    @UploadedFile() file:Express.Multer.File,
    @Res() res: Response,
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const user = await this.usersService.verifyToken(req.cookies.token);
    const userId = user.username;
    
    if (file) {
      const filePath = '/img/' + file.filename;
      updateUserDto.uprofile = filePath;
    }

    await this.usersService.update(userId, updateUserDto);
    console.log('바뀐후 userId', userId)
    return res.status(200).json({message : "업데이트 성공"})
  }
  
  @Post('logout/out')
  async logout(@Req()req:Request, @Res() response: Response){
    response.clearCookie('token',{ path:'/', httpOnly : true, sameSite :"none", secure:true });

    return response.status(200).json({message: '로그아웃 성공'});
  }
}
