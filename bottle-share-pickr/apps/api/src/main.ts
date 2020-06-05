/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { API_URL } from '@bottle-share-pickr/api-interface';
import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = API_URL;
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
