import { IsNotEmpty, IsString } from 'class-validator';

export class MemoDto {
  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  fileId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subject: string;
}
