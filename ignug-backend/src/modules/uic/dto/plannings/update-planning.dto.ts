import { PartialType } from '@nestjs/swagger';
import { BasePlanningDto } from '@uic/dto';

export class UpdatePlanningDto extends PartialType(BasePlanningDto) {}
