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

@Controller('memos')
export class MemosController {
  constructor(private readonly memosService: MemosService) {}

  @Post('create-memo')
  async createMemo(@Body() memoDto: MemoDto) {
    return this.memosService.createMemo(memoDto);
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

  @Delete('delete-memo/:memoId')
  async deleteMemo(@Param('memoId') memoId: number) {
    return this.memosService.deleteMemo(memoId);
  }
}
