import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class SaturationService {
  constructor(private readonly prisma: PrismaService) {}

  async getSaturation(dateRaw: string) {
    const date = new Date(dateRaw);

    const zones = await this.prisma.zone.findMany({
      include: {
        works: {
          where: {
            planned_start_date: { lte: date },
            OR: [{ planned_end_date: null }, { planned_end_date: { gte: date } }],
            planning_status: { in: ['PLANNED', 'IN_PROGRESS', 'DELAYED'] }
          }
        }
      }
    });

    return zones.map((zone) => {
      const workersPlanned = zone.works.reduce((sum, work) => sum + work.workers_count, 0);
      const ratio = zone.max_workers_per_day === 0 ? 0 : workersPlanned / zone.max_workers_per_day;
      const status = workersPlanned > zone.max_workers_per_day ? 'HIGH' : ratio > 0.8 ? 'MEDIUM' : 'LOW';
      return {
        zoneId: zone.id,
        zoneCode: zone.code,
        zoneName: zone.name,
        workersPlanned,
        maxWorkers: zone.max_workers_per_day,
        status
      };
    });
  }
}
