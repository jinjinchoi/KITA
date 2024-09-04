import { Res,Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res()res:Response) {
    try {
    const user = await this.authService.validateUser(loginUserDto.uid, loginUserDto.upw);

    const token = this.authService.login(user);
    const date= new Date();

    date.setDate(date.getDate()+10);
    const date2  = new Date(date);

    res.cookie('token', token, {
      httpOnly: true,
      expires: date2,
      sameSite: 'none', // 크로스 사이트 정책 sameSite = lax , sameSite: 'none'
      secure : true, // https sameSite: 'none'가 있어야 한다.
      path: '/',
      domain: 'localhost'
    });

    res.status(200).send();

  } catch(err) {
    res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
  }
  }
}
