import { Controller, Get, Query } from '@nestjs/common';
import { SaturationService } from './saturation.service';

@Controller('saturation')
export class SaturationController {
  constructor(private readonly saturationService: SaturationService) {}

  @Get()
  getSaturation(@Query('date') date: string) {
    return this.saturationService.getSaturation(date);
  }
}
