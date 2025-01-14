import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MemoDto {
  body?: string = null;
  fileId?: string = null;
  status: string = 'Draft';
  @IsNotEmpty()
  @IsNumber()
  from: number;
  to?: number = null;
  @IsNotEmpty()
  @IsBoolean()
  isDraft: boolean;
  @IsNotEmpty()
  @IsString()
  subject: string;
}
