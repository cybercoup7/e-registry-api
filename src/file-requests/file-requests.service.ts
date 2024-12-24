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
    const data = await this.prismaService.fileRequest.findMany({
      include: { requestedBy: true },
    });
    data.forEach((request) => {
      delete request.requestedBy.password;
    });
    return data;
  }

  async getRequestById(id: number) {
    const data = await this.prismaService.fileRequest.findUnique({
      where: { id: parseInt(id.toString()) },
      include: { requestedBy: true },
    });
    delete data?.requestedBy?.password;
    return data;
  }

  async getFileRequestByUserID(userId: number) {
    return this.prismaService.fileRequest.findFirst({
      where: { userId: parseInt(userId.toString()) },
    });
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
        where: { id: parseInt(fileId.toString()) },
      });
    } catch (e) {
      throw new NotFoundException('request does not exist');
    }
  }
}
