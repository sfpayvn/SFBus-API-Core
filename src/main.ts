import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SizeLimitMiddleware } from './middleware/size-limit-middleware';
import * as bodyParser from 'body-parser';
import fastifyMultipart from '@fastify/multipart';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: 104857600, // 100MB
    }),
  );

  (app as any).register(fastifyMultipart, {
    limits: {
      fileSize: 104857600, // 100MB
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // chỉ giữ lại các field có decorator
      forbidNonWhitelisted: false, // nếu có field ngoài => báo lỗi
      transform: true, // (tùy chọn) tự cast kiểu dữ liệu
    }),
  );
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  // app.use(bodyParser.json({ limit: '500mb' }));
  // app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
  });
  // Apply Custom Middleware for Request Size
  app.use(new SizeLimitMiddleware().use);

  // Giả lập API trả về chậm (delay 2 giây)
  // app.use((req, res, next) => {
  //   setTimeout(() => {
  //     next();
  //   }, 2000);
  // });

  await app.listen(port, '0.0.0.0');
}
bootstrap();
