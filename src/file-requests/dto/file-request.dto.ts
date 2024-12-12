import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FileRequestDto {
  @IsNotEmpty()
  @IsNumber()
  requestedBy: number;

  @IsNotEmpty()
  @IsString()
  fileNo: string;

  @IsNotEmpty()
  @IsString()
  reason: string;
  comment?: string;
  status?: string;
}
