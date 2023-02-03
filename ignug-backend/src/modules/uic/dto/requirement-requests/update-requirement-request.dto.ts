import { PartialType } from '@nestjs/swagger';
import { BaseRequirementRequestDto } from '@uic/dto';

export class UpdateRequirementRequestDto extends PartialType(BaseRequirementRequestDto) {}
