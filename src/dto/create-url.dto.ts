import { IsUrl, IsOptional, Length, Matches } from "class-validator";

export class CreateUrlDto {
  @IsUrl({}, { message: "Некорректный URL" })
  originalUrl: string;

  @IsOptional()
  @Length(3, 10, { message: "Код должен быть 3-10 символов" })
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: "Только буквы, цифры, - и _" })
  customCode?: string;
}
