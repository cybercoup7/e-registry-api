import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MemosService } from './memos.service';
import { MemoDto } from './dto/memoDto.dto';
import { ForwardMemoDto } from './dto/forwardMemo.dto';

@Controller('memos')
export class MemosController {
  constructor(private readonly memosService: MemosService) {}

  @Post('create-memo')
  async createMemo(@Body() memoDto: MemoDto) {
    return this.memosService.createMemo(memoDto);
  }

  @Post('forward-memo')
  async forwardMemo(@Body() dto: ForwardMemoDto) {
    return this.memosService.forwardMemo(dto);
  }

  @Patch('update-memo/:memoId')
  async updateMemo(@Body() memoDto: MemoDto, @Param('memoId') memoId: number) {
    return this.memosService.updateMemo(memoDto, memoId);
  }

  @Get('all-memos')
  async getAllMemos() {
    return this.memosService.getAllMemos();
  }

  @Get(':memoId')
  async getMemo(@Param('memoId') memoId: number) {
    return this.memosService.getMemoById(memoId);
  }

  @Get('get-memos-forwarded-to-user/:userId')
  async getMemosForwardedToUser(@Param('userId') userId: number) {
    return this.memosService.getMemosForwardedToUser(
      parseInt(userId.toString()),
    );
  }

  @Delete('delete-memo/:memoId')
  async deleteMemo(@Param('memoId') memoId: number) {
    return this.memosService.deleteMemo(memoId);
  }
}
