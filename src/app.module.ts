import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DeptModule } from './dept/dept.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    DeptModule,
  ],
})
export class AppModule {}
