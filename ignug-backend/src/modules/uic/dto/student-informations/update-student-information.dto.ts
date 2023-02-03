import { PartialType } from '@nestjs/swagger';
import { BaseStudentInformationDto } from './base-student-information.dto';

export class UpdateStudentInformationDto extends PartialType(
  BaseStudentInformationDto,
) {}
