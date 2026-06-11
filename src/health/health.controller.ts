import { Controller, Get } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller("health")
export class HealthController {
  @Get()
  checkHealth() {
    return {
      status: "ok",
      service: "url-shortener-microservice",
      timestamp: new Date().toISOString(),
    };
  }

  @MessagePattern({ cmd: "health_check" })
  checkHealthMicro() {
    return { status: "running", uptime: process.uptime() };
  }
}
