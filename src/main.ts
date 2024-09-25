import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.enableCors()
  app.use(helmet())

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Kanban_Board')
    .setDescription('Use this doc to test Kanban_Board backend api routes')
    .setVersion('0.1')
    .addTag('kanban_board')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const configService = app.get(ConfigService)
  await app.listen(configService.get('PORT'))
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
