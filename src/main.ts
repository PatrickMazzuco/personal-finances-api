import { AllExceptionsFilter } from '@filters/exceptions.filter';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassValidatorPipe } from '@pipes/validation.pipe';

import * as packageJson from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const apiConfig = {
    prefix: 'api/v1',
    version: packageJson.version,
    port: process.env.PORT || 3000,
  };

  app.setGlobalPrefix(apiConfig.prefix);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Persona Finances API')
    .setDescription('Personal Finances App project')
    .setVersion(apiConfig.version)
    .setContact('Patrick Mazzuco', '', '')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${apiConfig.prefix}/docs`, app, document);

  app.enableCors();
  app.useGlobalPipes(
    new ClassValidatorPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(apiConfig.port, () => {
    logger.log(`Application is running on port ${apiConfig.port}`);
  });
}

bootstrap();
