import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/prisma.service';
import { UpdateWorkDto } from './dto';

@Injectable()
export class WorksService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.work.findMany({ include: { zone: true } });
  }

  async updateWork(id: string, dto: UpdateWorkDto, changedBy: string) {
    const existing = await this.prisma.work.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Work not found');
    if (existing.version !== dto.version) throw new ConflictException('Version mismatch');

    const { version, ...changes } = dto;
    const updateInput: Prisma.WorkUpdateInput = {
      ...changes,
      planned_start_date: changes.planned_start_date ? new Date(changes.planned_start_date) : undefined,
      planned_end_date: changes.planned_end_date ? new Date(changes.planned_end_date) : undefined,
      version: { increment: 1 }
    };

    const updated = await this.prisma.work.update({ where: { id }, data: updateInput });

    await this.prisma.workHistory.create({
      data: {
        work_id: id,
        changed_by: changedBy,
        field: 'work_update',
        old_value: existing,
        new_value: updated,
        changed_at: new Date()
      }
    });

    return updated;
  }
}
