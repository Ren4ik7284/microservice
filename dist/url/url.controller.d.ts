import { UrlService } from "./url.service";
import { CreateUrlDto } from "../dto/create-url.dto";
export declare class UrlController {
    private readonly urlService;
    constructor(urlService: UrlService);
    createShortUrl(createUrlDto: CreateUrlDto): Promise<{
        shortCode: string;
        shortUrl: string;
        originalUrl: string;
    }>;
    redirectToUrl(code: string): Promise<{
        redirectUrl: string;
    }>;
    getStats(code: string): Promise<import("./url.entity").Url>;
    listAll(): Promise<import("./url.entity").Url[]>;
    deleteUrl(code: string): Promise<void>;
    handleCreate(createUrlDto: CreateUrlDto): Promise<{
        shortCode: string;
        shortUrl: string;
        originalUrl: string;
    }>;
    handleGetOriginal(shortCode: string): Promise<string>;
    handleGetStats(shortCode: string): Promise<import("./url.entity").Url>;
    handleListAll(): Promise<import("./url.entity").Url[]>;
    handleDelete(shortCode: string): Promise<void>;
}
