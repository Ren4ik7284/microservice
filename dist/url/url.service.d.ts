import { Url } from "./url.entity";
import { CreateUrlDto } from "../dto/create-url.dto";
export declare class UrlService {
    private urlModel;
    private cache;
    constructor(urlModel: typeof Url);
    createShortUrl(createUrlDto: CreateUrlDto): Promise<{
        shortCode: string;
        shortUrl: string;
        originalUrl: string;
    }>;
    getOriginalUrl(shortCode: string): Promise<string>;
    incrementClicks(shortCode: string): Promise<void>;
    getStats(shortCode: string): Promise<Url>;
    listAllUrls(limit?: number): Promise<Url[]>;
    deleteUrl(shortCode: string): Promise<void>;
}
