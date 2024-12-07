import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, UserDto } from './dto/user.dto';

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
}
