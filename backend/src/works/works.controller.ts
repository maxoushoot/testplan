import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UpdateWorkDto } from './dto';
import { WorksService } from './works.service';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  getWorks() {
    return this.worksService.findAll();
  }

  @Put(':id')
  updateWork(@Param('id') id: string, @Body() dto: UpdateWorkDto) {
    return this.worksService.updateWork(id, dto);
  }
}
