import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LogDtoDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsString()
  title?: string;

  @IsNotEmpty()
  @IsString()
  action: string;
}
