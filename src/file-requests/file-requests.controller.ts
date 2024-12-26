import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FileRequestsService } from './file-requests.service';
import { FileRequestDto } from './dto/file-request.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('file-requests')
export class FileRequestsController {
  constructor(private readonly fileRequestService: FileRequestsService) {}

  @Post('create-request')
  async createRequest(@Body() request: FileRequestDto) {
    return this.fileRequestService.createFileRequest(request);
  }

  @Patch('update-request/:requestId')
  @ApiQuery({
    name: 'status',
    required: true,
    enum: ['Pending', 'Successful', 'Rejected'],
  })
  @ApiQuery({ name: 'comment', required: false })
  async updateRequest(
    @Param('requestId') requestId: number,
    @Query('status') status: string,
    @Query('comment') comment?: string,
  ) {
    console.log(status, comment);
    return this.fileRequestService.updateFileRequest(
      status,
      requestId,
      comment,
    );
  }
  @Get('get-all-file-requests')
  @ApiQuery({
    name: 'status',
    required: true,
    enum: ['Pending', 'Successful', 'Rejected'],
  })
  getAllFileRequests(
    @Query() allParams: { status?: string; page?: string; perPage?: string },
  ) {
    return this.fileRequestService.getAllRequests(allParams);
  }

  @Get('get-request-by-id/:id')
  getRequestById(@Param('id') id: number) {
    return this.fileRequestService.getRequestById(id);
  }

  @Get('get-request-by-userId/:userId')
  getRequestByUserId(@Param('userId') userId: number) {
    return this.fileRequestService.getFileRequestByUserID(userId);
  }

  @Get('get-stats')
  async getStats() {
    return this.fileRequestService.getStats();
  }

  @Delete('delete-request')
  async deleteRequest(@Param('requestId') requestId: number) {
    return this.fileRequestService.deleteFileRequest(requestId);
  }
}
