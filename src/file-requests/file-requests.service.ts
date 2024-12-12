import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileRequestDto } from './dto/file-request.dto';

@Injectable()
export class FileRequestsService {
  constructor(private prismaService: PrismaService) {}

  async createFileRequest(fileRequest: FileRequestDto) {
    try {
      return await this.prismaService.fileRequest.create({
        data: {
          fileNo: fileRequest.fileNo,
          status: 'Pending',
          reason: fileRequest.reason,
          userId: fileRequest.requestedBy,
        },
      });
    } catch (e) {
      throw new NotFoundException('file or user does not exist');
    }
  }

  async changeStatus(status: string, comment: string, id: number) {
    try {
      return this.prismaService.fileRequest.update({
        where: { id: id },
        data: { status: status, comment: comment },
      });
    } catch (e) {
      throw new NotFoundException('request not found');
    }
  }

  async getAllRequests() {
    return this.prismaService.fileRequest.findMany();
  }

  async getRequestById(id: number) {
    return this.prismaService.fileRequest.findUnique({ where: { id: id } });
  }

  async updateFileRequest(fileRequest: FileRequestDto, requestId: number) {
    try {
      return await this.prismaService.fileRequest.update({
        where: { id: requestId },
        data: {
          fileNo: fileRequest.fileNo,
          reason: fileRequest.reason,
        },
      });
    } catch (e) {
      throw new NotFoundException('request does not exist');
    }
  }

  async deleteFileRequest(fileId: number) {
    try {
      return await this.prismaService.fileRequest.delete({
        where: { id: fileId },
      });
    } catch (e) {
      throw new NotFoundException('request does not exist');
    }
  }
}
