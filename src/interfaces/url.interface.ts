export interface IShortUrl {
  id: number;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}
