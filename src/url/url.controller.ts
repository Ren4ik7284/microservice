import { Controller, Get, Post, Delete, Param, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UrlService } from "./url.service";
import { CreateUrlDto } from "../dto/create-url.dto";
import { URL_PATTERNS } from "../constants/patterns.constants";

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post("shorten")
  @HttpCode(HttpStatus.CREATED)
  async createShortUrl(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.createShortUrl(createUrlDto);
  }

  @Get(":code")
  async redirectToUrl(@Param("code") code: string) {
    const originalUrl = await this.urlService.getOriginalUrl(code);
    return { redirectUrl: originalUrl };
  }

  @Get("stats/:code")
  async getStats(@Param("code") code: string) {
    return this.urlService.getStats(code);
  }

  @Get("urls/all")
  async listAll() {
    return this.urlService.listAllUrls();
  }

  @Delete(":code")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUrl(@Param("code") code: string) {
    await this.urlService.deleteUrl(code);
  }

  @MessagePattern(URL_PATTERNS.CREATE)
  async handleCreate(@Payload() createUrlDto: CreateUrlDto) {
    return this.urlService.createShortUrl(createUrlDto);
  }

  @MessagePattern(URL_PATTERNS.GET_ORIGINAL)
  async handleGetOriginal(@Payload() shortCode: string) {
    return this.urlService.getOriginalUrl(shortCode);
  }

  @MessagePattern(URL_PATTERNS.GET_STATS)
  async handleGetStats(@Payload() shortCode: string) {
    return this.urlService.getStats(shortCode);
  }

  @MessagePattern(URL_PATTERNS.LIST_ALL)
  async handleListAll() {
    return this.urlService.listAllUrls();
  }

  @MessagePattern(URL_PATTERNS.DELETE)
  async handleDelete(@Payload() shortCode: string) {
    return this.urlService.deleteUrl(shortCode);
  }
}
