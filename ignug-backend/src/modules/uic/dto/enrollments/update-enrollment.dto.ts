import { PartialType } from '@nestjs/swagger';
import { BaseEnrollmentDto } from '@uic/dto';

export class UpdateEnrollmentDto extends PartialType(BaseEnrollmentDto) {}

