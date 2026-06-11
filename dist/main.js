"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.TCP,
        options: {
            host: "0.0.0.0",
            port: 3001,
        },
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
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
//# sourceMappingURL=main.js.map