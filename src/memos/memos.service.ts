import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MemoDto } from './dto/memoDto.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForwardMemoDto } from './dto/forwardMemo.dto';

@Injectable()
export class MemosService {
  constructor(private readonly prismaService: PrismaService) {}

  async createMemo(memo: MemoDto) {
    console.log(memo);
    try {
      return await this.prismaService.memo.create({
        data: {
          body: memo.body,
          fileId: memo.fileId,
          from: memo.from,
          isDraft: memo.isDraft,
          to: memo.to,
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
        throw new ForbiddenException(e.message);
      }
    }
  }

  async updateMemo(memo: MemoDto, id: number) {
    try {
      await this.prismaService.memo.update({
        where: { id: id },
        data: {
          body: memo.body,
          isDraft: memo.isDraft,
          status: memo.status,
          fileId: memo.fileId,
          subject: memo.subject,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new NotFoundException(`No file or user was found`);
        }
        if (e.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
    }
  }

  //forwardMemo
  async forwardMemo(dto: ForwardMemoDto) {
    return this.prismaService.forwardedMemo.create({
      data: {
        forwardedById: dto.forwardedById,
        forwardedToId: dto.forwardedToId,
        status: dto.status,
        comment: dto.comment,
        memoId: dto.memoId,
      },
    });
  }

  // get all memos
  async getAllMemos() {
    return this.prismaService.memo.findMany({
      where: { isDraft: false },
      include: { file: true, fromUser: true, toUser: true },
    });
  }

  //get memo by id
  async getMemoById(id: number) {
    const data = await this.prismaService.memo.findUnique({
      where: { id: parseInt(id.toString()), isDraft: false },
      include: { file: true, toUser: true, fromUser: true },
    });
    if (!data) throw new NotFoundException('memo not found');
    const forwardHistory = await this.prismaService.forwardedMemo.findMany({
      where: { memoId: parseInt(id.toString()) },
      include: {
        forwardedTo: true,
        forwardedBy: true,
      },
    });
    forwardHistory.forEach((value) => {
      delete value.forwardedBy.password;
      delete value.forwardedTo.password;
    });
    return { ...data, forwardHistory };
  }

  //get memos forwarded to a user
  async getMemosForwardedToUser(userId: number) {
    try {
      return await this.prismaService.forwardedMemo.findMany({
        where: { forwardedToId: userId },
        include: { memo: true, forwardedTo: true, forwardedBy: true },
      });
    } catch (e) {
      throw new NotFoundException('memo not found');
    }
  }

  //get memos forwarded from a user
  async getMemosForwardedFromUser(userId: number) {
    try {
      return await this.prismaService.forwardedMemo.findMany({
        where: { forwardedById: userId },
        include: { memo: true, forwardedTo: true, forwardedBy: true },
      });
    } catch (e) {
      throw new NotFoundException('memo not found');
    }
  }

  //get memos sent by a user
  async getUserMemos(userId: number) {
    try {
      return await this.prismaService.memo.findMany({
        where: { from: userId, isDraft: false },
        include: { file: true, fromUser: true, toUser: true },
      });
    } catch (e) {
      throw new NotFoundException('memo not found');
    }
  }

  //get user drafts
  async getUserDrafts(userId: number) {
    try {
      return await this.prismaService.memo.findMany({
        where: { from: userId, isDraft: true },
        include: { file: true, fromUser: true, toUser: true },
      });
    } catch (e) {
      throw new NotFoundException('memo not found');
    }
  }

  //delete memo
  async deleteMemo(id: number) {
    try {
      return await this.prismaService.memo.delete({
        where: { id: parseInt(id.toString()) },
      });
    } catch (e) {
      throw new NotFoundException('memo not found');
    }
  }
}
