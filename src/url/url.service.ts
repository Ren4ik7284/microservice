
import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Url } from "./url.entity";
import { CreateUrlDto } from "../dto/create-url.dto";
import { nanoid } from "nanoid";

@Injectable()
export class UrlService {
  private cache = new Map<string, string>();

  constructor(
    @InjectModel(Url)
    private urlModel: typeof Url,
  ) {}

  async createShortUrl(createUrlDto: CreateUrlDto) {
    const { originalUrl, customCode } = createUrlDto;
    const shortCode = customCode || nanoid(6);

    const existing = await this.urlModel.findOne({ where: { shortCode } });
    if (existing) {
      throw new ConflictException("Такой код уже существует");
    }

    const url = await this.urlModel.create({
      shortCode,
      originalUrl,
    });

    this.cache.set(shortCode, originalUrl);

    return {
      shortCode,
      shortUrl: `http://localhost:3000/${shortCode}`,
      originalUrl,
    };
  }

  async getOriginalUrl(shortCode: string): Promise<string> {
    if (this.cache.has(shortCode)) {
      const cachedUrl = this.cache.get(shortCode);
      this.incrementClicks(shortCode).catch(console.error);
      return cachedUrl;
    }

    const url = await this.urlModel.findOne({ where: { shortCode } });
    if (!url) {
      throw new NotFoundException("Ссылка не найдена");
    }

    this.cache.set(shortCode, url.originalUrl);
    await url.increment("clicks");

    return url.originalUrl;
  }

  async incrementClicks(shortCode: string): Promise<void> {
    await this.urlModel.increment("clicks", { where: { shortCode } });
  }

  async getStats(shortCode: string): Promise<Url> {
    const url = await this.urlModel.findOne({ where: { shortCode } });
    if (!url) {
      throw new NotFoundException("Ссылка не найдена");
    }
    return url;
  }

  async listAllUrls(limit = 100): Promise<Url[]> {
    return this.urlModel.findAll({
      order: [["createdAt", "DESC"]],
      limit,
    });
  }

  async deleteUrl(shortCode: string): Promise<void> {
    const deleted = await this.urlModel.destroy({ where: { shortCode } });
    if (deleted === 0) {
      throw new NotFoundException("Ссылка не найдена");
    }
    this.cache.delete(shortCode);
  }
}

