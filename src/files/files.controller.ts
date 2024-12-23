import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { fileDto } from './dto/file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('create-file')
  async createFile(@Body() file: fileDto) {
    return this.filesService.createFile(file);
  }

  @Patch('update-file')
  async updateFile(@Body() file: fileDto) {
    return this.filesService.updateFile(file);
  }


  @Get('get-all-files')
  async getAllFiles() {
    return this.filesService.getAllFiles();
  }

  @Get('get-file-by-id/:id')
  async getFileById(@Param('id') id: string) {
    return this.filesService.getFileById(id);
  }
  @Delete('delete-file/:fileNo')
  async deleteFile(@Param('fileNo') fileNo: string) {
    return this.filesService.deleteFile(fileNo);
  }
}
