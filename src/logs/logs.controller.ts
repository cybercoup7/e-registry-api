import { Body, Controller, Get, Post } from '@nestjs/common';
import { LogsService } from './logs.service';
import { LogDtoDto } from './dto/logDto.dto';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  //create log
  @Post('create-log')
  async createLog(@Body() logData: LogDtoDto) {
    return this.logsService.createLog(logData);
  }

  @Get('get-all-logs')
  async getAllLogs() {
    return this.logsService.getAllLogs();
  }
}
