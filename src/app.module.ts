import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DeptModule } from './dept/dept.module';
import { MemosModule } from './memos/memos.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    DeptModule,
    MemosModule,
    FilesModule,
  ],
})
export class AppModule {}
