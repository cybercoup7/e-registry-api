import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInDto, UpdateUserDto, UserDto } from './dto/user.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: UserDto) {
    try {
      const hash = await argon.hash(userDto.password);
      const data = await this.prismaService.user.create({
        data: {
          departmentId: userDto.departmentId,
          email: userDto.email,
          password: hash,
          fName: userDto.fName,
          lName: userDto.lName,
          role: userDto.role,
          empNumber: userDto.empNumber,
          userDept: '',
        },
      });
      delete data.password;
      return data;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new NotFoundException(
            `No department with Id=${userDto.departmentId} was found`,
          );
        }
        if (e.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
      throw e;
    }
  }

  async update(userDto: UpdateUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: userDto.userId },
      data: {
        departmentId: userDto.departmentId,
        fName: userDto.fName,
        lName: userDto.lName,
        role: userDto.role,
        empNumber: userDto.empNumber,
      },
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async resetPassword(user: SignInDto) {
    try {
      const hash = await argon.hash(user.password);
      return this.prismaService.user.update({
        where: { email: user.email },
        data: {
          password: hash,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new ForbiddenException('User does not exist');
        }
        throw e;
      }
    }
  }

  async signIn(signInData: SignInDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: signInData.email,
      },
      include: {
        department: true,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }
    const matches = await argon.verify(user.password, signInData.password);
    if (!matches) {
      throw new ForbiddenException('Incorrect password');
    }
    return await this.jwtService.signAsync(
      {
        userId: user.id,
        email: user.email,
        fName: user.fName,
        lName: user.lName,
        role: user.role,
        empNumber: user.empNumber,
        userDept: user.department,
      },
      { expiresIn: '30 minutes' },
    );
  }

  async deleteUser(accountId: number) {
  return   this.prismaService.user.delete({ where: { id: accountId } });
  }
}
