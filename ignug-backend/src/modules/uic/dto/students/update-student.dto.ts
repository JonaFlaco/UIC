import { PartialType } from '@nestjs/swagger';
import { BaseStudentDto } from '@uic/dto';

export class UpdateStudentDto extends PartialType(BaseStudentDto) {}
