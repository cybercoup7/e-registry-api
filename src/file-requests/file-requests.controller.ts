import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { FileRequestsService } from './file-requests.service';
import { FileRequestDto } from './dto/file-request.dto';

@Controller('file-requests')
export class FileRequestsController {
  constructor(private readonly fileRequestService: FileRequestsService) {}

  @Post('create-request')
  async createRequest(@Body() request: FileRequestDto) {
    return this.fileRequestService.createFileRequest(request);
  }

  @Patch('update-request:requestId')
  async updateRequest(
    @Body() request: FileRequestDto,
    @Param('requestId') requestId: number,
  ) {
    return this.fileRequestService.updateFileRequest(request, requestId);
  }

  @Patch('change-status:requestId')
  async changeRequestStatus(
    @Param('requestId') requestId: number,
    @Body() status: string,
    @Body() comment: string,
  ) {
    return this.fileRequestService.changeStatus(status, comment, requestId);
  }

  @Get('get-all-file-requests')
  getAllFileRequests() {
    return this.fileRequestService.getAllRequests();
  }

  @Get('get-request-by-id:id')
  getRequestById(@Param('id') id: number) {
    return this.fileRequestService.getRequestById(id);
  }

  @Delete('delete-request')
  async deleteRequest(@Param('requestId') requestId: number) {
    return this.fileRequestService.deleteFileRequest(requestId);
  }
}
