import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('API Nama-Nama Hewan')
      .setDescription('API ini berisi list nama-nama hewan yang ada di indoensia')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('openapi', app, document);

    const cors = {
      origin: ['http://localhost:3000', 'http://localhost', '*'],
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: ['*'],
    };

    app.enableCors(cors);

    await app.listen(3000, () => {
      console.log('Application is running on: http://localhost:3000');
    });
  } catch (err) {
    console.error('Failed to start the application:', err);
    process.exit(1);
  }
}

bootstrap();
