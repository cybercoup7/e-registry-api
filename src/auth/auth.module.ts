import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ global: true, secret: 'e-registry' })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
