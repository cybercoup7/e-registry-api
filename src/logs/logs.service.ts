import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LogDtoDto } from './dto/logDto.dto';

@Injectable()
export class LogsService {
  constructor(private readonly prisma: PrismaService) {}

  //create log
  async createLog(logData: LogDtoDto) {
    return this.prisma.log.create({
      data: {
        title: logData.title,
        action: logData.action,
        userId: parseInt(logData.userId.toString()),
      },
    });
  }

  //get all logs
  async getAllLogs() {
    return this.prisma.log.findMany({ include: { user: true } });
  }

  //get logs by user id
  async getLogsByUserId(userId: number) {
    return this.prisma.log.findMany({
      where: { userId: userId },
      include: { user: true },
    });
  }
}
