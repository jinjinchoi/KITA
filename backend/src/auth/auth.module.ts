import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/users.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.Jwt_Key,
      signOptions: {expiresIn: '24h'},
    }),SequelizeModule.forFeature([User])
  ],
  providers: [AuthService ,UsersService,JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule,AuthModule],
})
export class AuthModule {}
