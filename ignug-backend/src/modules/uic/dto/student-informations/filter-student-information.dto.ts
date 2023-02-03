import { PaginationDto } from '@core/dto';
import { isStringValidationOptions } from '@shared/validation';
import { IsOptional, IsString } from 'class-validator';

export class FilterStudentInformationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  readonly companyWork: string;
}
