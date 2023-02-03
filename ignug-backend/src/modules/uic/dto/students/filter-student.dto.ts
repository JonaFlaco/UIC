import { PaginationDto } from '@core/dto';
//import { isStringValidationOptions } from '@shared/validation';
import { IsOptional, IsString } from 'class-validator';

export class FilterStudentDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly observation: string;
}
