import { IsNotEmpty, IsString } from 'class-validator';

export class MemoDto {
  @IsNotEmpty()
  @IsString()
  from: string;
  @IsNotEmpty()
  @IsString()
  body: string;
  @IsNotEmpty()
  @IsString()
  fileId: string;
  cc?: string;
  forwardedTo?: string;
  memoComment?: string;
  @IsNotEmpty()
  @IsString()
  to: string;
  ufs?: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  subject: string;
}
