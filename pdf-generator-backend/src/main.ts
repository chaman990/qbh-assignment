import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(3000);

  const server = app.getHttpServer();
  const router = server._events.request._router;

  const availableRoutes: [] = router.stack
  .map(layer => {
    if (layer.route) {
      return {
        route: {
          path: layer.route?.path,
          method: layer.route?.stack[0].method,
        },
      };
    }
  })
  .filter(item => item !== undefined);
console.log(availableRoutes);

}
bootstrap();
