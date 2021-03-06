import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Nest.js example API')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()  
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
}