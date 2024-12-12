import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class fileDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  fileNo: string;

  @IsNotEmpty()
  @IsNumber()
  departmentId: number;

  @IsNotEmpty()
  @IsString()
  fileSubject: string;

  @IsNotEmpty()
  @IsString()
  fileTitle: string;
}
