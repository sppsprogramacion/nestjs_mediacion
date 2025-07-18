import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';
//para configuracion de <<disable>> por seguridad en cabeceras
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  //NestExpressApplication permite usar <<disable>> para seguridad
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = parseInt(configService.get<string>(SERVER_PORT),10) || 3000;

  //CONFIGURACION DE SEGURIDAD (VULNERABILIDADES detectadas EN CHECKEOS)
  //Desactivar cabecera X-Powered-By
  app.disable('x-powered-by');
  //Configurar CORS de forma segura -   <<app.enableCors();>> sin argumentos permite cualquier origen
  app.enableCors({
    origin: ['https://bdmediacion.salta.gob.ar', 'http://localhost:4200'], // o más de uno si tenés
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // app.useGlobalFilters(new AllExceptionFilter());
  // app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  await app.listen(port);  
  const logger = new Logger();
  logger.log(`corriendo en el servidor ${await app.getUrl()}`)
}
bootstrap();
