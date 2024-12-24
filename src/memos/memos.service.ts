import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemoDto } from './dto/memoDto.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MemosService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMemo(memo: MemoDto) {
    try {
      return await this.prismaService.memo.create({
        data: {
          from: memo.from,
          body: memo.body,
          FileId: memo.fileId,
          cc: memo.cc,
          forwardedTo: memo.forwardedTo,
          memoComment: memo.memoComment,
          forwardHistry: [],
          to: memo.to,
          ufs: memo.ufs,
          title: memo.title,
          subject: memo.subject,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new NotFoundException(
            `No file with Id=${memo.fileId} was found`,
          );
        }
        if (e.code === 'P2002') {
          throw new ForbiddenException('memo already exists');
        }
      }
    }
  }

  async updateMemo(memo: MemoDto, id: number) {
    try {
      return await this.prismaService.memo.update({
        where: { id: id },
        data: {
          from: memo.from,
          body: memo.body,
          FileId: memo.fileId,
          cc: memo.cc,
          forwardedTo: memo.forwardedTo,
          memoComment: memo.memoComment,
          forwardHistry: memo.forwardedTo,
          to: memo.to,
          ufs: memo.ufs,
          title: memo.title,
          subject: memo.subject,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new NotFoundException(
            `No file with Id=${memo.fileId} was found`,
          );
        }
        if (e.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
    }
  }

  async getAllMemos() {
    return this.prismaService.memo.findMany({ include: { File: true } });
  }

  async getMemoById(id: number) {
    try {
      return await this.prismaService.memo.findUnique({
        where: { id: parseInt(id.toString()) },
        include: { File: true },
      });
    } catch (e) {
      throw new NotFoundException('memo not found');
    }
  }

  async deleteMemo(id: number) {
    try {
      return await this.prismaService.memo.delete({ where: { id: parseInt(id.toString(),) } });
    } catch (e) {
      throw new NotFoundException('memo not found');
    }
  }
}