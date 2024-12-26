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

  async getAllRequests(allParams: {
    status?: string;
    page?: string;
    perPage?: string;
  }) {
    const data = await this.prismaService.fileRequest.findMany({
      where: { status: allParams.status ?? 'Pending' },
      skip:
        parseInt(allParams.page ?? '0') * parseInt(allParams.perPage ?? '10'),
      include: { requestedBy: true },
    });
    const retrievedData = [];
    for (const request of data) {
      const file = await this.prismaService.file.findUnique({
        where: { fileNo: request.fileNo },
      });
      const userDepartment = await this.prismaService.department.findUnique({
        where: { id: request.requestedBy.departmentId },
      });
      const fileDepartment = await this.prismaService.department.findUnique({
        where: { id: file.departmentId },
      });

      delete request.requestedBy.password;
      retrievedData.push({ ...request, file, userDepartment, fileDepartment });
    }
    return retrievedData;
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

  async updateFileRequest(status: string, requestId: number, comment?: string) {
    try {
      return await this.prismaService.fileRequest.update({
        where: { id: parseInt(requestId.toString()) },
        data: {
          status: status,
          comment: comment ?? '',
        },
      });
    } catch (e) {
      throw new NotFoundException('request does not exist');
    }
  }

  async getStats() {
    const data = await this.prismaService.fileRequest.groupBy({
      by: ['status'],
      _count: {
        status: true,
      },
    });

    const stats = [];
    for (let i = 0; i < data.length; i++) {
      stats.push({
        status: data[i].status,
        count: data[i]._count.status,
      });
    }

    return stats;
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
