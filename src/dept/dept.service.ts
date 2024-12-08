import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class DeptService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDepartment(name: string) {
    try {
      return await this.prismaService.department.create({
        data: {
          departmentName: name,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('Department already exists');
        }
      }
      throw e;
    }
  }

  getAllDepartments() {
    return this.prismaService.department.findMany();
  }
}
