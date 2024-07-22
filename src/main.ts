import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants/cors';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './utils/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  
  app.enableCors(CORS);

  app.use(morgan('dev'))

  app.useGlobalInterceptors(new TransformInterceptor());

  const configService = app.get(ConfigService)

  const port = configService.get('PORT') || 3000

  app.setGlobalPrefix('api')

  await app.listen(port);

  console.log(`Aplication running on: ${await app.getUrl()}`);
  
}
bootstrap();
