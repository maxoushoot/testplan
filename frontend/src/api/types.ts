export type PlanningStatus = 'PLANNED' | 'IN_PROGRESS' | 'DONE' | 'DELAYED' | 'CANCELLED';

export interface Work {
  id: string;
  permit_id: string;
  title: string;
  building_id: string;
  zone_id: string;
  company_id: string;
  risk_level: number;
  workers_count: number;
  permit_status: string;
  planned_start_date: string | null;
  planned_end_date: string | null;
  planning_status: PlanningStatus;
  is_urgent: boolean;
  version: number;
  zone?: { code: string; name: string };
}

export interface SaturationResponse {
  zoneId: string;
  zoneCode: string;
  zoneName: string;
  workersPlanned: number;
  maxWorkers: number;
  status: 'LOW' | 'MEDIUM' | 'HIGH';
}
