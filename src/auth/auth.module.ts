import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({    // 向 nest 容器注册 jwt 模块，并配置密钥和令牌有效期
      secret: jwtConstants.secret,
      signOptions: {  expiresIn: 3600  }
  }),
  ],
  providers: [AuthService, JwtStrategy,LocalStrategy],
  exports: [AuthService]
})
export class AuthModule { }