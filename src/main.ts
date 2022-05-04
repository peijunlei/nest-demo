import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import logger from './common/middlewares/logger.middleware';
import setupSwagger from './swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局管道验证
  app.useGlobalPipes(new ValidationPipe({
    //白名单 过滤掉 客户端传递的无用属性
    whitelist: true,
    // 客户端传递的无用属性 会报错！
    // forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  setupSwagger(app);
  // app.use(logger);
  // app.useGlobalInterceptors(new TransformInterceptor())
  // app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
