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
exports.UrlController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const url_service_1 = require("./url.service");
const create_url_dto_1 = require("../dto/create-url.dto");
const patterns_constants_1 = require("../constants/patterns.constants");
let UrlController = class UrlController {
    constructor(urlService) {
        this.urlService = urlService;
    }
    async createShortUrl(createUrlDto) {
        return this.urlService.createShortUrl(createUrlDto);
    }
    async redirectToUrl(code) {
        const originalUrl = await this.urlService.getOriginalUrl(code);
        return { redirectUrl: originalUrl };
    }
    async getStats(code) {
        return this.urlService.getStats(code);
    }
    async listAll() {
        return this.urlService.listAllUrls();
    }
    async deleteUrl(code) {
        await this.urlService.deleteUrl(code);
    }
    async handleCreate(createUrlDto) {
        return this.urlService.createShortUrl(createUrlDto);
    }
    async handleGetOriginal(shortCode) {
        return this.urlService.getOriginalUrl(shortCode);
    }
    async handleGetStats(shortCode) {
        return this.urlService.getStats(shortCode);
    }
    async handleListAll() {
        return this.urlService.listAllUrls();
    }
    async handleDelete(shortCode) {
        return this.urlService.deleteUrl(shortCode);
    }
};
exports.UrlController = UrlController;
__decorate([
    (0, common_1.Post)("shorten"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_url_dto_1.CreateUrlDto]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "createShortUrl", null);
__decorate([
    (0, common_1.Get)(":code"),
    __param(0, (0, common_1.Param)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "redirectToUrl", null);
__decorate([
    (0, common_1.Get)("stats/:code"),
    __param(0, (0, common_1.Param)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)("urls/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "listAll", null);
__decorate([
    (0, common_1.Delete)(":code"),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "deleteUrl", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_constants_1.URL_PATTERNS.CREATE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_url_dto_1.CreateUrlDto]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "handleCreate", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_constants_1.URL_PATTERNS.GET_ORIGINAL),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "handleGetOriginal", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_constants_1.URL_PATTERNS.GET_STATS),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "handleGetStats", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_constants_1.URL_PATTERNS.LIST_ALL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "handleListAll", null);
__decorate([
    (0, microservices_1.MessagePattern)(patterns_constants_1.URL_PATTERNS.DELETE),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UrlController.prototype, "handleDelete", null);
exports.UrlController = UrlController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [url_service_1.UrlService])
], UrlController);
//# sourceMappingURL=url.controller.js.map