import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { PlanningStatus } from '@prisma/client';

export class UpdateWorkDto {
  @IsInt()
  version!: number;

  @IsOptional()
  @IsDateString()
  planned_start_date?: string;

  @IsOptional()
  @IsDateString()
  planned_end_date?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  risk_level?: number;

  @IsOptional()
  @IsInt()
  workers_count?: number;

  @IsOptional()
  @IsString()
  permit_status?: string;

  @IsOptional()
  @IsEnum(PlanningStatus)
  planning_status?: PlanningStatus;

  @IsOptional()
  @IsBoolean()
  is_urgent?: boolean;
}
