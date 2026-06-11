import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: 3001,
    },
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  app.enableCors();

  await app.startAllMicroservices();
  await app.listen(3000);
  
  console.log("✅ HTTP сервер: http://localhost:3000");
  console.log("✅ Микросервис TCP: localhost:3001");
  console.log("🏥 Health check: http://localhost:3000/health");
}
bootstrap();
