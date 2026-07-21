import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  create(instructorId: number, data: { title: string; description?: string }) {
    return this.prisma.course.create({
      data: {
        ...data,
        instructorId,
      },
    });
  }

  findAll() {
    return this.prisma.course.findMany();
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  update(id: number, data: { title?: string; description?: string }) {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}
