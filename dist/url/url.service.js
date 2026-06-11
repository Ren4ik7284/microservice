"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const url_entity_1 = require("./url.entity");
const nanoid_1 = require("nanoid");
let UrlService = class UrlService {
    constructor(urlModel) {
        this.urlModel = urlModel;
        this.cache = new Map();
    }
    async createShortUrl(createUrlDto) {
        const { originalUrl, customCode } = createUrlDto;
        const shortCode = customCode || (0, nanoid_1.nanoid)(6);
        const existing = await this.urlModel.findOne({ where: { shortCode } });
        if (existing) {
            throw new common_1.ConflictException("Такой код уже существует");
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
    async getOriginalUrl(shortCode) {
        if (this.cache.has(shortCode)) {
            const cachedUrl = this.cache.get(shortCode);
            this.incrementClicks(shortCode).catch(console.error);
            return cachedUrl;
        }
        const url = await this.urlModel.findOne({ where: { shortCode } });
        if (!url) {
            throw new common_1.NotFoundException("Ссылка не найдена");
        }
        this.cache.set(shortCode, url.originalUrl);
        await url.increment("clicks");
        return url.originalUrl;
    }
    async incrementClicks(shortCode) {
        await this.urlModel.increment("clicks", { where: { shortCode } });
    }
    async getStats(shortCode) {
        const url = await this.urlModel.findOne({ where: { shortCode } });
        if (!url) {
            throw new common_1.NotFoundException("Ссылка не найдена");
        }
        return url;
    }
    async listAllUrls(limit = 100) {
        return this.urlModel.findAll({
            order: [["createdAt", "DESC"]],
            limit,
        });
    }
    async deleteUrl(shortCode) {
        const deleted = await this.urlModel.destroy({ where: { shortCode } });
        if (deleted === 0) {
            throw new common_1.NotFoundException("Ссылка не найдена");
        }
        this.cache.delete(shortCode);
    }
};
exports.UrlService = UrlService;
exports.UrlService = UrlService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(url_entity_1.Url)),
    __metadata("design:paramtypes", [Object])
], UrlService);
//# sourceMappingURL=url.service.js.map