import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { fileDto } from './dto/file.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class FilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createFile(file: fileDto) {
    try {
      return await this.prismaService.file.create({
        data: {
          id: file.id,
          fileNo: file.fileNo,
          departmentId: file.departmentId,
          fileSubject: file.fileSubject,
          fileTitle: file.fileTitle,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new NotFoundException(
            `No department with Id=${file.departmentId} was found`,
          );
        }
        if (e.code === 'P2002') {
          throw new ForbiddenException('File already exists');
        }
      }
      throw e;
    }
  }

  async updateFile(file: fileDto) {
    try {
      return await this.prismaService.file.update({
        where: { id: file.id },
        data: {
          fileNo: file.fileNo,
          departmentId: file.departmentId,
          fileSubject: file.fileSubject,
          fileTitle: file.fileTitle,
        },
      });
    } catch (e) {
      console.log(e.code);
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new NotFoundException(`No file with Id=${file.id} was found`);
        }
        if (e.code === 'P2025') {
          throw new NotFoundException('Department or file does not exist');
        }
      }
      throw e;
    }
  }

  async getAllFiles() {
    return this.prismaService.file.findMany({
      include: { memos: true, Department: true },
    });
  }

  async getFileById(id: string) {
    try {
      return await this.prismaService.file.findFirst({
        where: { id: id },
        include: { Department: true, memos: true },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2004') {
          throw new ForbiddenException(`No file with Id=${id} was found`);
        }
      }
      throw e;
    }
  }

  async deleteFile(id: string) {
    try {
      return await this.prismaService.file.delete({ where: { id: id } });
    } catch (e) {
      console.log(e.code);
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(
            `Can not delete file that does not exist`,
          );
        }
      }
      throw e;
    }
  }
}
