import { PartialType } from '@nestjs/swagger';
import { BaseProjectPlanDto } from '@uic/dto';

export class UpdateProjectPlanDto extends PartialType(BaseProjectPlanDto) {}

