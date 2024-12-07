import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  fName: string;
  @IsNotEmpty()
  lName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  role: string;
  @IsNotEmpty()
  userDept: string;
  @IsNotEmpty()
  empNumber: string;
  @IsNotEmpty()
  departmentId: number;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}