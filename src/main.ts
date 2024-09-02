import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'));
}
bootstrap();
