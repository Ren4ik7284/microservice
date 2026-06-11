import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UrlModule } from "./url/url.module";
import { HealthModule } from "./health/health.module";
import { Url } from "./url/url.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "sqlite",
      storage: "./data/urls.sqlite",
      models: [Url],
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UrlModule,
    HealthModule,
  ],
})
export class AppModule {}
