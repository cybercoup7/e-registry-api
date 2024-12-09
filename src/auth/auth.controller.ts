import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, UpdateUserDto, UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() user: UserDto) {
    return this.authService.signUp(user);
  }

  @Post('signIn')
  signIn(@Body() user: SignInDto) {
    return this.authService.signIn(user);
  }

  @Get('getUserByEmail:email')
  getUserByEmail(@Param('email') email: string) {
    return this.authService.getUserByEmail(email);
  }

  @Get('getAllUsers')
  getAllUsers() {
    return this.authService.getAllUsers();
  }

  @Patch('updateAccount')
  update(@Body() user: UpdateUserDto) {
    return this.authService.update(user);
  }

  @Patch('resetPassword')
  resetPassword(@Body() user: SignInDto) {
    return this.authService.resetPassword(user);
  }

  @Delete('deleteAccount:id')
  deleteAccount(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}
