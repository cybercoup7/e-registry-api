import { Module } from '@nestjs/common';
import { FileRequestsService } from './file-requests.service';
import { FileRequestsController } from './file-requests.controller';

@Module({
  providers: [FileRequestsService],
  controllers: [FileRequestsController]
})
export class FileRequestsModule {}
