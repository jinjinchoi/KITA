import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { clear, error } from 'console';
import { LoginUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService : UsersService,
        private jwtService: JwtService
    ){}

    async validateUser(uid: string, pass: string): Promise<any> {
        const loginUserDto: LoginUserDto = { uid, upw: pass };
        try{
            const user = await this.usersService.validateUser(loginUserDto);
        if (user) {
            const { upw, ...result } = user;
            return result;
        }
        return null;
    }catch(err){
        console.error(err)
        throw err
        }
    }

    login(user:any){
        const payload = { username: user.dataValues.uid, sub: user.dataValues.unickname, profile: user.dataValues.uprofile};

        return this.jwtService.sign(payload);
    }

    logout(){
        clear()
    }
}
