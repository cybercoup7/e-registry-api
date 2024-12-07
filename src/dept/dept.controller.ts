import { Body, Controller, Param, Post } from '@nestjs/common';
import { DeptService } from './dept.service';

@Controller('dept')
export class DeptController {
  constructor(private readonly departmentService: DeptService) {}

  @Post('create/:department')
  createDepartment(@Param('department') department: string) {
    return this.departmentService.createDepartment(department);
  }
}
