import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class DeptService {
  constructor(private readonly prismaService: PrismaService) {}

  createDepartment(name: string) {
    return this.prismaService.department.create({
      data: {
        departmentName: name,
      },
    });
  }
}
