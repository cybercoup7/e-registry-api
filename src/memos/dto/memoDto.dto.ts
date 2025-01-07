import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MemoDto {
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  fileId: string;

  @IsString()
  status?: string;
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  from: number;

  @IsNotEmpty()
  @IsNumber()
  to: number;

  @IsNotEmpty()
  @IsString()
  subject: string;
}
