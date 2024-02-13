import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Audit App LMS API ')
    .setDescription('LMS API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const PORT = process.env.PORT;
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT, () => {
    console.log(` Service Started at: ${PORT}`);
  });
}
bootstrap();
