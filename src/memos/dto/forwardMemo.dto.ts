import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ForwardMemoDto {
  @IsNumber()
  @IsNotEmpty()
  forwardedById: number;

  @IsNumber()
  @IsNotEmpty()
  forwardedToId: number;

  @IsNumber()
  @IsNotEmpty()
  memoId: number;

  @IsString()
  comment?: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
