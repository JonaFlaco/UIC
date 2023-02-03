import { PartialType } from '@nestjs/swagger';
import { BaseTutorAssignmentDto } from '@uic/dto';

export class UpdateTutorAssignmentDto extends PartialType(BaseTutorAssignmentDto) {}
