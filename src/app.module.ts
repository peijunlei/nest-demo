import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeeModule } from './coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
        type:"postgres",
        host:"localhost",
        port:5432,
        username:"postgres",
        password:"pass123",
        database:"postgres",
        autoLoadEntities:true,
        synchronize:true,//生产禁用这个
    }),
    AuthModule,
    UserModule,
    CoffeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
