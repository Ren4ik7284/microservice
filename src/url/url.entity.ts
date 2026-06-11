import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table({ tableName: "urls", timestamps: true })
export class Url extends Model<Url> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(10),
    unique: true,
    allowNull: false,
  })
  shortCode: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  originalUrl: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  clicks: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
