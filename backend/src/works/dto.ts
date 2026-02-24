import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

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
  @IsEnum(['PLANNED', 'IN_PROGRESS', 'DONE', 'DELAYED', 'CANCELLED'])
  planning_status?: 'PLANNED' | 'IN_PROGRESS' | 'DONE' | 'DELAYED' | 'CANCELLED';

  @IsOptional()
  @IsBoolean()
  is_urgent?: boolean;
}
