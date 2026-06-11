import { Model } from "sequelize-typescript";
export declare class Url extends Model<Url> {
    id: number;
    shortCode: string;
    originalUrl: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
}
