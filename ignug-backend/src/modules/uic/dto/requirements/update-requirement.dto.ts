import { PartialType } from '@nestjs/swagger';
import { BaseRequirementDto } from '@uic/dto';

export class UpdateRequirementDto extends PartialType(BaseRequirementDto) {}
